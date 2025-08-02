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
          url: "https://cdn.builder.io/api/v1/image/assets%2Fe71e97532f2844a185b2d79650e8b74b%2Facd7c9ab6e014da6a90cd85ddfe18f9d?format=webp&width=800",
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
          url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
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
      date: "2024-01-15",
      hover_image: {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "Next.js tutorial"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "Next.js is a powerful React framework that enables you to build production-ready applications with ease."
              }
            ]
          }
        }
      ]
    },
    tags: ["Next.js", "React", "Web Development"]
  },
  {
    uid: "mastering-typescript",
    data: {
      title: "Mastering TypeScript",
      date: "2024-01-10",
      hover_image: {
        url: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "TypeScript guide"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "TypeScript brings static typing to JavaScript, making your code more robust and maintainable."
              }
            ]
          }
        }
      ]
    },
    tags: ["TypeScript", "JavaScript", "Programming"]
  },
  {
    uid: "react-best-practices",
    data: {
      title: "React Best Practices for 2024",
      date: "2024-01-05",
      hover_image: {
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "React development"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "Learn the latest React best practices, including hooks optimization, performance tips, and modern patterns."
              }
            ]
          }
        }
      ]
    },
    tags: ["React", "JavaScript", "Performance"]
  },
  {
    uid: "modern-css-techniques",
    data: {
      title: "Modern CSS Techniques",
      date: "2023-12-28",
      hover_image: {
        url: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "CSS development"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "Explore modern CSS features like Grid, Flexbox, Custom Properties, and the latest layout techniques."
              }
            ]
          }
        }
      ]
    },
    tags: ["CSS", "Web Design", "Frontend"]
  }
];

// Static projects
export const staticProjects: StaticProject[] = [
  {
    uid: "3d-portfolio",
    data: {
      title: "3D Portfolio Website",
      date: "2024-01-01",
      hover_image: {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "3D Portfolio"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "A modern 3D portfolio website built with Next.js and Three.js featuring interactive animations and smooth user experience."
              }
            ]
          }
        }
      ]
    },
    tags: ["React", "Three.js", "Next.js"]
  },
  {
    uid: "e-commerce-app",
    data: {
      title: "E-commerce Application",
      date: "2023-12-15",
      hover_image: {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "E-commerce app"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "A full-stack e-commerce application with user authentication, payment processing, and inventory management."
              }
            ]
          }
        }
      ]
    },
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    uid: "task-management",
    data: {
      title: "Task Management System",
      date: "2023-11-20",
      hover_image: {
        url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=220&q=80",
        alt: "Task management"
      },
      slices: [
        {
          slice_type: "text_block",
          variation: "default",
          primary: {
            text: [
              {
                type: "paragraph",
                text: "A collaborative task management system with real-time updates, team collaboration features, and progress tracking."
              }
            ]
          }
        }
      ]
    },
    tags: ["Vue.js", "Express", "PostgreSQL"]
  }
];
