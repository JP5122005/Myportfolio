import { Metadata } from "next";
import { SliceZone } from "@/components/StaticComponents";
import { components } from "@/slices";
import { getSettings } from "@/db/queries";

export default async function ProjectsPage() {
  // Get settings from database for title
  let settings;
  try {
    settings = await getSettings();
  } catch (error) {
    console.error('Error fetching settings:', error);
    settings = null;
  }

  const name = settings?.name || "Jenil Patel";

  const projectsPageData = {
    slices: [
      {
        slice_type: "hero",
        variation: "default",
        primary: {
          first_name: "My",
          last_name: "Projects",
          tag_line: "Things I've Built"
        }
      },
      {
        slice_type: "content_index",
        variation: "default",
        primary: {
          heading: "Featured Projects",
          description: [
            {
              type: "paragraph",
              text: "A collection of projects I've worked on, showcasing my skills in various technologies and frameworks."
            }
          ],
          content_type: "Project",
          view_more_text: "View Project",
          fallback_item_image: {
            url: "https://via.placeholder.com/320x220/475569/f1f5f9?text=Project",
            alt: "Project image"
          }
        }
      },
      {
        slice_type: "tech_list",
        variation: "default",
        primary: {
          heading: "Technologies I Use"
        },
        items: [
          {
            tech_name: "React",
            tech_color: "#61DAFB"
          },
          {
            tech_name: "Next.js",
            tech_color: "#000000"
          },
          {
            tech_name: "TypeScript",
            tech_color: "#3178C6"
          },
          {
            tech_name: "Node.js",
            tech_color: "#339933"
          },
          {
            tech_name: "Three.js",
            tech_color: "#000000"
          }
        ]
      }
    ]
  };

  return <SliceZone slices={projectsPageData.slices} components={components} />;
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
    title: `Projects - ${name}`,
    description: "Browse through my portfolio of projects showcasing modern web development skills.",
  };
}
