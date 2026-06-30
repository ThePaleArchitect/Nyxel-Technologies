import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { projects } from '@/lib/projects';
import logger from '@/lib/logger';

// Helper to authenticate admin session
async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('nx_vault_session')?.value;
    if (!sessionToken) return false;

    const sessionData = await redis.get(`session:${sessionToken}`);
    if (!sessionData) return false;

    // Check if session data is a string or parsed object depending on Redis driver
    const session = typeof sessionData === 'string' ? JSON.parse(sessionData) : sessionData;
    return session.role === 'admin';
  } catch (error) {
    logger.error({ error }, 'verifyAdmin failed');
    return false;
  }
}

// GET: Return all projects (dynamic from Redis or fallback to static)
export async function GET() {
  try {
    const dynamicProjects = await redis.get('db:projects');
    if (dynamicProjects) {
      const list = typeof dynamicProjects === 'string' ? JSON.parse(dynamicProjects) : dynamicProjects;
      return NextResponse.json({ success: true, data: list });
    }
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    logger.error({ error }, 'GET projects failed');
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST: Add a new project
export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { codename, industry, stack, scale, problem, solution, result, ipfsCid } = body;

    if (!codename || !industry || !stack || !scale || !problem || !solution || !result) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const currentData = await redis.get('db:projects');
    const projectsList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [...projects];

    // Check if already exists
    const exists = projectsList.some((p: any) => p.codename.toLowerCase() === codename.toLowerCase());
    if (exists) {
      return NextResponse.json({ success: false, error: 'Project with this codename already exists' }, { status: 400 });
    }

    const newProject = {
      id: codename.toLowerCase(),
      codename,
      industry,
      stack: Array.isArray(stack) ? stack : stack.split(',').map((s: string) => s.trim()),
      scale,
      problem,
      solution,
      result,
      ipfsCid: ipfsCid || ''
    };

    projectsList.push(newProject);
    await redis.set('db:projects', JSON.stringify(projectsList));
    logger.info({ codename }, 'New project added to database');

    return NextResponse.json({ success: true, data: projectsList });
  } catch (error) {
    logger.error({ error }, 'POST project failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update an existing project
export async function PUT(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { codename, industry, stack, scale, problem, solution, result, ipfsCid } = body;

    if (!codename) {
      return NextResponse.json({ success: false, error: 'Codename is required to update' }, { status: 400 });
    }

    const currentData = await redis.get('db:projects');
    const projectsList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [...projects];

    const index = projectsList.findIndex((p: any) => p.codename.toLowerCase() === codename.toLowerCase());
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    projectsList[index] = {
      ...projectsList[index],
      ...(industry && { industry }),
      ...(stack && { stack: Array.isArray(stack) ? stack : stack.split(',').map((s: string) => s.trim()) }),
      ...(scale && { scale }),
      ...(problem && { problem }),
      ...(solution && { solution }),
      ...(result && { result }),
      ...(ipfsCid !== undefined && { ipfsCid })
    };

    await redis.set('db:projects', JSON.stringify(projectsList));
    logger.info({ codename }, 'Project updated in database');

    return NextResponse.json({ success: true, data: projectsList });
  } catch (error) {
    logger.error({ error }, 'PUT project failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Remove a project
export async function DELETE(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const codename = searchParams.get('codename');

    if (!codename) {
      return NextResponse.json({ success: false, error: 'Codename is required' }, { status: 400 });
    }

    const currentData = await redis.get('db:projects');
    const projectsList = currentData 
      ? (typeof currentData === 'string' ? JSON.parse(currentData) : currentData)
      : [...projects];

    const updatedList = projectsList.filter((p: any) => p.codename.toLowerCase() !== codename.toLowerCase());
    
    if (projectsList.length === updatedList.length) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await redis.set('db:projects', JSON.stringify(updatedList));
    logger.info({ codename }, 'Project deleted from database');

    return NextResponse.json({ success: true, data: updatedList });
  } catch (error) {
    logger.error({ error }, 'DELETE project failed');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
