import { Metadata } from "next";
import { SliceZone } from "@/components/StaticComponents";

import { components } from "@/slices";
import { getHomepage, getSettings } from "@/db/queries";
import { staticHomepage } from "@/data/static-data";

export default async function Page() {
  let page;

  try {
    // Try to get homepage from database
    const dbHomepage = await getHomepage();

    if (dbHomepage && dbHomepage.content) {
      page = {
        data: {
          slices: JSON.parse(dbHomepage.content)
        }
      };
    } else {
      // Fallback to static data
      page = staticHomepage;
    }
  } catch (error) {
    console.error('Error fetching homepage:', error);
    // Fallback to static data
    page = staticHomepage;
  }

  return <SliceZone slices={page.data?.slices || page.slices} components={components} />
}

export async function generateMetadata(): Promise<Metadata> {
  let metaTitle = "3D Portfolio | Jenil Patel";
  let metaDescription = "Full-stack developer specializing in modern web technologies";

  try {
    // Try to get settings from database
    const settings = await getSettings();

    if (settings) {
      metaTitle = settings.metaTitle || metaTitle;
      metaDescription = settings.metaDescription || metaDescription;
    }
  } catch (error) {
    console.error('Error fetching settings for metadata:', error);
  }

  return {
    title: metaTitle,
    description: metaDescription,
  };
}
