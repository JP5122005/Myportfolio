import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@/components/StaticComponents";

import { createClient } from "@/utils/static-client";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  // Handle any other dynamic pages that might be needed
  // For now, most routes should go to specific static pages
  // This is mainly for legacy or custom page routes
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: "Page Not Found",
    description: "The requested page was not found.",
  };
}

export async function generateStaticParams() {
  return [];
}
