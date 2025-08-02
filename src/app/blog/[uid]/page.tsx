import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/static-client";
import ContentBody from "../../../components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  
  try {
    const page = await client.getByUID("blog_post", params.uid);
    return <ContentBody page={page} />;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  
  try {
    const page = await client.getByUID("blog_post", params.uid);
    
    return {
      title: page.data.title,
      description: `Blog post: ${page.data.title}`,
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post was not found.",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
