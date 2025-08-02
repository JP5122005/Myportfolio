import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostByUid, updateBlogPost, deleteBlogPost } from '@/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const post = await getBlogPostByUid(params.uid);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
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
    
    const updatedPost = await updateBlogPost(params.uid, {
      title: body.title,
      date: body.date,
      hoverImageUrl: body.hoverImageUrl,
      hoverImageAlt: body.hoverImageAlt,
      slices: body.slices,
      tags: body.tags,
      published: body.published,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const success = await deleteBlogPost(params.uid);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
