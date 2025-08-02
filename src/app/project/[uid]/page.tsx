import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/static-client";
import ContentBody from "../../../components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  
  try {
    const page = await client.getByUID("project", params.uid);
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
    const page = await client.getByUID("project", params.uid);
    
    return {
      title: page.data.title,
      description: `Project: ${page.data.title}`,
    };
  } catch (error) {
    return {
      title: "Project Not Found",
      description: "The requested project was not found.",
    };
  }
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
