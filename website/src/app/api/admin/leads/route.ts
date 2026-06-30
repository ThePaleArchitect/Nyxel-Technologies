import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
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

// GET: Return all dynamic leads from Redis
export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const dynamicLeads = await redis.get('db:leads');
    const list = dynamicLeads 
      ? (typeof dynamicLeads === 'string' ? JSON.parse(dynamicLeads) : dynamicLeads)
      : [];
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    logger.error({ error }, 'GET leads failed');
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// DELETE: Purge a specific lead by index or timestamp
export async function DELETE(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const timestamp = searchParams.get('timestamp');

    if (!timestamp) {
      return NextResponse.json({ success: false, error: 'Timestamp is required to purge lead' }, { status: 400 });
    }

    const currentData = await redis.get('db:leads');
    const leadsList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [];

    const updatedList = leadsList.filter((lead: any) => String(lead.timestamp) !== String(timestamp));
    
    await redis.set('db:leads', JSON.stringify(updatedList));
    logger.info({ timestamp }, 'Lead inquiry purged from database');

    return NextResponse.json({ success: true, data: updatedList });
  } catch (error) {
    logger.error({ error }, 'DELETE lead failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
