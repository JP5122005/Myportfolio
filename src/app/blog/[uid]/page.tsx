import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/static-client";
import ContentBody from "../../../components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const page = blogPosts.find(post => post.uid === params.uid);

  if (!page) {
    notFound();
  }

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const page = blogPosts.find(post => post.uid === params.uid);

  if (!page) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post was not found.",
    };
  }

  return {
    title: page.data.title,
    description: `Blog post: ${page.data.title}`,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
