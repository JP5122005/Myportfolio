import { Metadata } from "next";
import { SliceZone } from "@/components/StaticComponents";
import { components } from "@/slices";

export default async function AboutPage() {
  const aboutPageData = {
    slices: [
      {
        slice_type: "hero",
        variation: "default",
        primary: {
          first_name: "About",
          last_name: "Me",
          tag_line: "My Journey & Story"
        }
      },
      {
        slice_type: "biography",
        variation: "default",
        primary: {
          heading: "Who I Am",
          description: [
            {
              type: "paragraph",
              text: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating interactive and engaging user experiences using cutting-edge tools and frameworks."
            }
          ],
          button_text: "View Projects",
          button_link: { url: "/projects" },
          avatar: {
            url: "https://cdn.builder.io/api/v1/image/assets%2Fe71e97532f2844a185b2d79650e8b74b%2Facd7c9ab6e014da6a90cd85ddfe18f9d?format=webp&width=800",
            alt: "Jenil Patel"
          }
        }
      },
      {
        slice_type: "experience",
        variation: "default",
        primary: {
          heading: "Experience & Education"
        },
        items: [
          {
            title: "Senior Full-Stack Developer",
            time_period: "2022 - Present",
            institution: "Tech Company",
            description: [
              {
                type: "paragraph",
                text: "Led development of modern web applications using React, Next.js, and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions."
              }
            ]
          },
          {
            title: "Frontend Developer",
            time_period: "2020 - 2022",
            institution: "Digital Agency",
            description: [
              {
                type: "paragraph",
                text: "Developed responsive web applications and interactive user interfaces. Worked with designers to implement pixel-perfect designs."
              }
            ]
          },
          {
            title: "Computer Science Degree",
            time_period: "2016 - 2020",
            institution: "University",
            description: [
              {
                type: "paragraph",
                text: "Studied computer science fundamentals, algorithms, and software engineering principles."
              }
            ]
          }
        ]
      }
    ]
  };

  return <SliceZone slices={aboutPageData.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About - Jenil Patel",
    description: "Learn more about Jenil Patel, a passionate full-stack developer with expertise in modern web technologies.",
  };
}
