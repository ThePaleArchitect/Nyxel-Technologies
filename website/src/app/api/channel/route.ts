import { NextRequest, NextResponse } from 'next/server';
import { channelSubmissionSchema } from '@/lib/validation/channelSubmission';
import { redis } from '@/lib/redis';
import logger, { logError } from '@/lib/logger';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate using Zod schema
    const result = channelSubmissionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Rate Limiting (Section 16.1: 2 requests/IP/day)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimitKey = `ratelimit:channel:${ip}`;
    const rateLimitCount = await redis.incr(rateLimitKey);
    if (rateLimitCount === 1) {
      // Set TTL to 24 hours (86400 seconds)
      await redis.set(rateLimitKey, '1', { ex: 86400 });
    }
    
    const maxLimit = Number(process.env.CHANNEL_REQUEST_LIMIT) || 2;
    if (rateLimitCount > maxLimit) {
      logger.warn({ ip, email: data.email }, 'Channel form rate limit exceeded');
      return NextResponse.json(
        { error: 'Inquiry limit reached. Please try again tomorrow.' },
        { status: 429 }
      );
    }

    // Forward to Slack / Discord webhook if configured
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    const slackPayload = {
      text: `*NXC ✦ Secure Channel Inquiry received!*`,
      attachments: [
        {
          color: data.tier === 'Incident Response' ? '#FF1A1A' : '#00F0FF',
          fields: [
            { title: 'Name', value: data.fullName, short: true },
            { title: 'Email', value: data.email, short: true },
            { title: 'Company', value: data.companyName, short: true },
            { title: 'Role', value: data.role, short: true },
            { title: 'Tier Requested', value: data.tier, short: true },
            { title: 'Referral Code', value: data.referralCode || 'None', short: true },
            { title: 'NDA Status', value: data.ndaReady ? 'NDA Pre-Ready Signed' : 'Not Ready', short: true },
            { title: 'Technical Brief', value: data.technicalBrief, short: false },
          ],
        },
      ],
    };

    if (webhookUrl && !webhookUrl.includes('hooks.slack.com/services/...')) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackPayload),
        });
        if (!response.ok) {
          logger.error({ status: response.status }, 'Slack webhook post failed');
        }
      } catch (err: any) {
        logger.error({ error: err.message }, 'Failed to trigger Slack webhook');
      }
    } else {
      // Mock log output
      logger.info({
        slackPayload,
        mock: true
      }, '----- SLACK ALERTER: NEW SECURE CHANNEL INTAKE -----\n' + JSON.stringify(slackPayload, null, 2) + '\n---------------------------------------------------');
    }

    // Store lead persistently in Redis db:leads
    try {
      const currentLeadsData = await redis.get('db:leads');
      const leadsList = currentLeadsData
        ? (typeof currentLeadsData === 'string' ? JSON.parse(currentLeadsData) : currentLeadsData)
        : [];
      
      const newLead = {
        ...data,
        timestamp: Date.now(),
        ip,
      };

      leadsList.push(newLead);
      await redis.set('db:leads', JSON.stringify(leadsList));
      logger.info({ email: data.email }, 'Inquiry successfully saved to database');
    } catch (dbErr) {
      logger.error({ error: dbErr }, 'Failed to save lead in Redis');
    }

    logger.info({ email: data.email, tier: data.tier }, 'Channel form submission processed');

    return NextResponse.json({ success: true, message: 'Your secure brief has been transmitted.' });
  } catch (error: any) {
    logError(error, { path: '/api/channel' });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
