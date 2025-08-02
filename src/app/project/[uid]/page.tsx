import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectByUid } from "@/db/queries";
import ContentBody from "../../../components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  try {
    const project = await getProjectByUid(params.uid);

    if (!project || !project.published) {
      notFound();
    }

    // Convert database format to expected page format
    const page = {
      uid: project.uid,
      data: {
        title: project.title,
        date: project.date,
        hover_image: project.hoverImage ? { url: project.hoverImage, alt: project.title } : null,
        slices: project.content ? JSON.parse(project.content) : []
      },
      tags: project.tags ? project.tags.split(',').map(tag => tag.trim()) : []
    };

    return <ContentBody page={page} />;
  } catch (error) {
    console.error('Error fetching project:', error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  try {
    const project = await getProjectByUid(params.uid);

    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project was not found.",
      };
    }

    return {
      title: project.title,
      description: project.description || `Project: ${project.title}`,
    };
  } catch (error) {
    return {
      title: "Project Not Found",
      description: "The requested project was not found.",
    };
  }
}

// We don't need generateStaticParams for database-driven content
// Next.js will generate pages on-demand
