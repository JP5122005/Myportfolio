import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    
    const projects = await getAllProjects(publishedOnly);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.uid || !body.title || !body.date) {
      return NextResponse.json(
        { error: 'Missing required fields: uid, title, date' },
        { status: 400 }
      );
    }

    const newProject = await createProject({
      uid: body.uid,
      title: body.title,
      date: body.date,
      hoverImageUrl: body.hoverImageUrl || null,
      hoverImageAlt: body.hoverImageAlt || null,
      slices: body.slices || [],
      tags: body.tags || [],
      published: body.published ?? true,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
