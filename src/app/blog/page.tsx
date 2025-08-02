import { Metadata } from "next";
import { SliceZone } from "@/components/StaticComponents";
import { components } from "@/slices";
import { getSettings } from "@/db/queries";

export default async function BlogPage() {
  // Get settings from database for title
  let settings;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error('Error fetching settings:', error);
    settings = null;
  }

  const name = settings?.name || "Jenil Patel";

  const blogPageData = {
    slices: [
      {
        slice_type: "hero",
        variation: "default",
        primary: {
          first_name: "My",
          last_name: "Blog",
          tag_line: "Thoughts & Insights"
        }
      },
      {
        slice_type: "content_index",
        variation: "default",
        primary: {
          heading: "Latest Blog Posts",
          description: [
            {
              type: "paragraph",
              text: "I write about web development, programming tips, and the latest technologies I'm exploring."
            }
          ],
          content_type: "Blog",
          view_more_text: "Read More",
          fallback_item_image: {
            url: "https://via.placeholder.com/320x220/475569/f1f5f9?text=Blog",
            alt: "Blog post image"
          }
        }
      }
    ]
  };

  return <SliceZone slices={blogPageData.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error('Error fetching settings:', error);
    settings = null;
  }

  const name = settings?.name || "Jenil Patel";

  return {
    title: `Blog - ${name}`,
    description: "Read my latest blog posts about web development, programming, and technology.",
  };
}
