import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogPostByUid } from "@/db/queries";
import ContentBody from "../../../components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  try {
    const blogPost = await getBlogPostByUid(params.uid);

    if (!blogPost || !blogPost.published) {
      notFound();
    }

    // Convert database format to expected page format
    const page = {
      uid: blogPost.uid,
      data: {
        title: blogPost.title,
        date: blogPost.date,
        hover_image: blogPost.hoverImage ? { url: blogPost.hoverImage, alt: blogPost.title } : null,
        slices: blogPost.content ? JSON.parse(blogPost.content) : []
      },
      tags: blogPost.tags && typeof blogPost.tags === 'string' ? blogPost.tags.split(',').map(tag => tag.trim()) : []
    };

    return <ContentBody page={page} />;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const blogPost = await getBlogPostByUid(params.uid);

    if (!blogPost) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post was not found.",
      };
    }

    return {
      title: blogPost.title,
      description: blogPost.description || `Blog post: ${blogPost.title}`,
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post was not found.",
    };
  }
}

// We don't need generateStaticParams for database-driven content
// Next.js will generate pages on-demand
