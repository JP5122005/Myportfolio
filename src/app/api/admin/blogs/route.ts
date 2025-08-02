import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost } from '@/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    
    const posts = await getAllBlogPosts(publishedOnly);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
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

    const newPost = await createBlogPost({
      uid: body.uid,
      title: body.title,
      date: body.date,
      hoverImageUrl: body.hoverImageUrl || null,
      hoverImageAlt: body.hoverImageAlt || null,
      slices: body.slices || [],
      tags: body.tags || [],
      published: body.published ?? true,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
