import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { ROSTER } from '@/lib/constants';
import logger from '@/lib/logger';

// Helper to authenticate admin session
async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('nx_vault_session')?.value;
    if (!sessionToken) return false;

    const sessionData = await redis.get(`session:${sessionToken}`);
    if (!sessionData) return false;

    const session = typeof sessionData === 'string' ? JSON.parse(sessionData) : sessionData;
    return session.role === 'admin';
  } catch (error) {
    logger.error({ error }, 'verifyAdmin failed');
    return false;
  }
}

// GET: Return all roster members (dynamic from Redis or fallback to static constants)
export async function GET() {
  try {
    const dynamicRoster = await redis.get('db:roster');
    if (dynamicRoster) {
      const list = typeof dynamicRoster === 'string' ? JSON.parse(dynamicRoster) : dynamicRoster;
      return NextResponse.json({ success: true, data: list });
    }
    return NextResponse.json({ success: true, data: ROSTER });
  } catch (error) {
    logger.error({ error }, 'GET roster failed');
    return NextResponse.json({ success: false, error: 'Failed to fetch roster' }, { status: 500 });
  }
}

// POST: Add a new roster member
export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { handle, role, experience, stack, timezone } = body;

    if (!handle || !role || !experience || !stack || !timezone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const currentData = await redis.get('db:roster');
    const rosterList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [...ROSTER];

    // Check if already exists
    const exists = rosterList.some((r: any) => r.handle.toLowerCase() === handle.toLowerCase());
    if (exists) {
      return NextResponse.json({ success: false, error: 'Roster member with this handle already exists' }, { status: 400 });
    }

    const newMember = {
      handle,
      role,
      experience,
      stack: Array.isArray(stack) ? stack : stack.split(',').map((s: string) => s.trim()),
      timezone
    };

    rosterList.push(newMember);
    await redis.set('db:roster', JSON.stringify(rosterList));
    logger.info({ handle }, 'New roster member added to database');

    return NextResponse.json({ success: true, data: rosterList });
  } catch (error) {
    logger.error({ error }, 'POST roster failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update an existing roster member
export async function PUT(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { handle, role, experience, stack, timezone } = body;

    if (!handle) {
      return NextResponse.json({ success: false, error: 'Handle is required to update' }, { status: 400 });
    }

    const currentData = await redis.get('db:roster');
    const rosterList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [...ROSTER];

    const index = rosterList.findIndex((r: any) => r.handle.toLowerCase() === handle.toLowerCase());
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Roster member not found' }, { status: 404 });
    }

    rosterList[index] = {
      ...rosterList[index],
      ...(role && { role }),
      ...(experience && { experience }),
      ...(stack && { stack: Array.isArray(stack) ? stack : stack.split(',').map((s: string) => s.trim()) }),
      ...(timezone && { timezone })
    };

    await redis.set('db:roster', JSON.stringify(rosterList));
    logger.info({ handle }, 'Roster member updated in database');

    return NextResponse.json({ success: true, data: rosterList });
  } catch (error) {
    logger.error({ error }, 'PUT roster failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Remove a roster member
export async function DELETE(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');

    if (!handle) {
      return NextResponse.json({ success: false, error: 'Handle is required' }, { status: 400 });
    }

    const currentData = await redis.get('db:roster');
    const rosterList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [...ROSTER];

    const updatedList = rosterList.filter((r: any) => r.handle.toLowerCase() !== handle.toLowerCase());
    
    if (rosterList.length === updatedList.length) {
      return NextResponse.json({ success: false, error: 'Roster member not found' }, { status: 404 });
    }

    await redis.set('db:roster', JSON.stringify(updatedList));
    logger.info({ handle }, 'Roster member deleted from database');

    return NextResponse.json({ success: true, data: updatedList });
  } catch (error) {
    logger.error({ error }, 'DELETE roster failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
