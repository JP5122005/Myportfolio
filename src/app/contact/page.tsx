import { Metadata } from "next";
import { SliceZone } from "@/components/StaticComponents";
import { components } from "@/slices";

export default async function ContactPage() {
  const contactPageData = {
    slices: [
      {
        slice_type: "hero",
        variation: "default",
        primary: {
          first_name: "Get In",
          last_name: "Touch",
          tag_line: "Let's Work Together"
        }
      },
      {
        slice_type: "biography",
        variation: "default",
        primary: {
          heading: "Contact Me",
          description: [
            {
              type: "paragraph",
              text: "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!"
            }
          ],
          button_text: "Send Email",
          button_link: { url: "mailto:hello@jenilpatel.dev" },
          avatar: {
            url: "https://cdn.builder.io/api/v1/image/assets%2Fe71e97532f2844a185b2d79650e8b74b%2Facd7c9ab6e014da6a90cd85ddfe18f9d?format=webp&width=800",
            alt: "Jenil Patel"
          }
        }
      },
      {
        slice_type: "text_block",
        variation: "default",
        primary: {
          text: [
            {
              type: "paragraph",
              text: "You can also find me on various social platforms. I'm active on GitHub, LinkedIn, and Twitter where I share my work and thoughts on web development."
            }
          ]
        }
      }
    ]
  };

  return <SliceZone slices={contactPageData.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact - Jenil Patel",
    description: "Get in touch with Jenil Patel for collaborations, projects, or just to chat about technology.",
  };
}
