import { StaticSettings, StaticPage, StaticBlogPost, StaticProject, StaticImage, StaticLink } from './types';

// Static settings data
export const staticSettings: StaticSettings = {
  meta_title: "3D Portfolio | Jenil Patel",
  meta_description: "Full-stack developer specializing in modern web technologies",
  name: "Jenil Patel",
  nav_item: [
    {
      link: { url: "/" },
      label: "Home"
    },
    {
      link: { url: "/about" },
      label: "About"
    },
    {
      link: { url: "/projects" },
      label: "Projects"
    },
    {
      link: { url: "/blog" },
      label: "Blog"
    }
  ],
  cta_link: { url: "/contact" },
  cta_label: "Contact",
  github_link: { url: "https://github.com" },
  twitter_link: { url: "https://twitter.com" },
  linkedin_link: { url: "https://linkedin.com" }
};

// Static homepage data
export const staticHomepage: StaticPage = {
  meta_title: "3D Portfolio | Jenil Patel",
  meta_description: "Full-stack developer specializing in modern web technologies",
  slices: [
    {
      slice_type: "hero",
      variation: "default",
      primary: {
        first_name: "Jenil",
        last_name: "Patel",
        tag_line: "Full-Stack Developer"
      }
    },
    {
      slice_type: "biography",
      variation: "default",
      primary: {
        heading: "About Me",
        description: [
          {
            type: "paragraph",
            text: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating interactive and engaging user experiences."
          }
        ],
        button_text: "Learn More",
        button_link: { url: "/about" },
        avatar: {
          url: "/images/avatar.jpg",
          alt: "Jenil Patel"
        }
      }
    },
    {
      slice_type: "tech_list",
      variation: "default",
      primary: {
        heading: "Technologies I Work With"
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
    },
    {
      slice_type: "experience",
      variation: "default",
      primary: {
        heading: "Experience"
      },
      items: [
        {
          title: "Senior Full-Stack Developer",
          time_period: "2022 - Present",
          institution: "Tech Company",
          description: [
            {
              type: "paragraph",
              text: "Led development of modern web applications using React, Next.js, and Node.js."
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
              text: "Developed responsive web applications and interactive user interfaces."
            }
          ]
        }
      ]
    },
    {
      slice_type: "content_index",
      variation: "default",
      primary: {
        heading: "Latest Projects",
        description: [
          {
            type: "paragraph",
            text: "Check out some of my recent work and projects."
          }
        ],
        content_type: "Project",
        view_more_text: "View Project",
        fallback_item_image: {
          url: "/images/project-fallback.jpg",
          alt: "Project image"
        }
      }
    }
  ]
};

// Static blog posts
export const staticBlogPosts: StaticBlogPost[] = [
  {
    uid: "getting-started-with-nextjs",
    data: {
      title: "Getting Started with Next.js",
      hover_image: {
        url: "/images/blog/nextjs.jpg",
        alt: "Next.js tutorial"
      }
    },
    tags: ["Next.js", "React", "Web Development"]
  },
  {
    uid: "mastering-typescript",
    data: {
      title: "Mastering TypeScript",
      hover_image: {
        url: "/images/blog/typescript.jpg",
        alt: "TypeScript guide"
      }
    },
    tags: ["TypeScript", "JavaScript", "Programming"]
  }
];

// Static projects
export const staticProjects: StaticProject[] = [
  {
    uid: "3d-portfolio",
    data: {
      title: "3D Portfolio Website",
      hover_image: {
        url: "/images/projects/portfolio.jpg",
        alt: "3D Portfolio"
      }
    },
    tags: ["React", "Three.js", "Next.js"]
  },
  {
    uid: "e-commerce-app",
    data: {
      title: "E-commerce Application",
      hover_image: {
        url: "/images/projects/ecommerce.jpg",
        alt: "E-commerce app"
      }
    },
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    uid: "task-management",
    data: {
      title: "Task Management System",
      hover_image: {
        url: "/images/projects/tasks.jpg",
        alt: "Task management"
      }
    },
    tags: ["Vue.js", "Express", "PostgreSQL"]
  }
];
