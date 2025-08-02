import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@/components/StaticComponents";

import { createClient } from "@/utils/static-client";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  // For now, redirect to homepage since we don't have dynamic pages
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
