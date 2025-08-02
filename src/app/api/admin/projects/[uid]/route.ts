import { NextRequest, NextResponse } from 'next/server';
import { getProjectByUid, updateProject, deleteProject } from '@/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const project = await getProjectByUid(params.uid);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const body = await request.json();
    
    const updatedProject = await updateProject(params.uid, {
      title: body.title,
      date: body.date,
      hoverImageUrl: body.hoverImageUrl,
      hoverImageAlt: body.hoverImageAlt,
      slices: body.slices,
      tags: body.tags,
      published: body.published,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const success = await deleteProject(params.uid);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
