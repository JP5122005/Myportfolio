import { 
  getSettings, 
  getHomepage, 
  getAllBlogPosts, 
  getAllProjects,
  getBlogPostByUid,
  getProjectByUid 
} from '@/db/queries';
import { 
  staticSettings, 
  staticHomepage, 
  staticBlogPosts, 
  staticProjects 
} from '@/data/static-data';
import type { StaticSettings, StaticPage, StaticBlogPost, StaticProject } from '@/data/types';

// Database client to replace Prismic client functionality
export class StaticClient {
  async getSingle(type: string): Promise<any> {
    switch (type) {
      case 'settings': {
        try {
          const settings = await getSettings();
          if (settings) {
            // Transform database format to expected format
            return {
              data: {
                meta_title: settings.metaTitle,
                meta_description: settings.metaDescription,
                name: settings.name,
                nav_item: settings.navItems,
                cta_link: { url: settings.ctaLink },
                cta_label: settings.ctaLabel,
                github_link: { url: settings.githubLink },
                twitter_link: { url: settings.twitterLink },
                linkedin_link: { url: settings.linkedinLink },
              } as StaticSettings
            };
          }
        } catch (error) {
          console.warn('Database unavailable for settings, using static data');
        }
        
        // Fallback to static data
        return { data: staticSettings };
      }
      case 'homepage': {
        try {
          const homepage = await getHomepage();
          if (homepage) {
            return {
              data: {
                meta_title: homepage.metaTitle,
                meta_description: homepage.metaDescription,
                slices: homepage.slices,
              } as StaticPage
            };
          }
        } catch (error) {
          console.warn('Database unavailable for homepage, using static data');
        }
        
        // Fallback to static data
        return { data: staticHomepage };
      }
      default:
        throw new Error(`Unknown document type: ${type}`);
    }
  }

  async getAllByType(type: string): Promise<any[]> {
    switch (type) {
      case 'blog_post': {
        try {
          const posts = await getAllBlogPosts(true);
          if (posts.length > 0) {
            return posts.map(post => ({
              uid: post.uid,
              data: {
                title: post.title,
                date: post.date,
                hover_image: post.hoverImageUrl ? {
                  url: post.hoverImageUrl,
                  alt: post.hoverImageAlt || ''
                } : undefined,
                slices: post.slices,
              },
              tags: Array.isArray(post.tags) ? post.tags : [],
            } as StaticBlogPost));
          }
        } catch (error) {
          console.warn('Database unavailable for blog posts, using static data');
        }
        
        // Fallback to static data
        return staticBlogPosts;
      }
      case 'project': {
        try {
          const projects = await getAllProjects(true);
          if (projects.length > 0) {
            return projects.map(project => ({
              uid: project.uid,
              data: {
                title: project.title,
                date: project.date,
                hover_image: project.hoverImageUrl ? {
                  url: project.hoverImageUrl,
                  alt: project.hoverImageAlt || ''
                } : undefined,
                slices: project.slices,
              },
              tags: Array.isArray(project.tags) ? project.tags : [],
            } as StaticProject));
          }
        } catch (error) {
          console.warn('Database unavailable for projects, using static data');
        }
        
        // Fallback to static data
        return staticProjects;
      }
      default:
        return [];
    }
  }

  async getByUID(type: string, uid: string): Promise<any> {
    switch (type) {
      case 'blog_post': {
        try {
          const post = await getBlogPostByUid(uid);
          if (post) {
            return {
              uid: post.uid,
              data: {
                title: post.title,
                date: post.date,
                hover_image: post.hoverImageUrl ? {
                  url: post.hoverImageUrl,
                  alt: post.hoverImageAlt || ''
                } : undefined,
                slices: post.slices,
              },
              tags: Array.isArray(post.tags) ? post.tags : [],
            } as StaticBlogPost;
          }
        } catch (error) {
          console.warn('Database unavailable for blog post, using static data');
        }
        
        // Fallback to static data
        const staticPost = staticBlogPosts.find(post => post.uid === uid);
        if (!staticPost) {
          throw new Error(`Blog post with UID "${uid}" not found`);
        }
        return staticPost;
      }
      case 'project': {
        try {
          const project = await getProjectByUid(uid);
          if (project) {
            return {
              uid: project.uid,
              data: {
                title: project.title,
                date: project.date,
                hover_image: project.hoverImageUrl ? {
                  url: project.hoverImageUrl,
                  alt: project.hoverImageAlt || ''
                } : undefined,
                slices: project.slices,
              },
              tags: Array.isArray(project.tags) ? project.tags : [],
            } as StaticProject;
          }
        } catch (error) {
          console.warn('Database unavailable for project, using static data');
        }
        
        // Fallback to static data
        const staticProject = staticProjects.find(project => project.uid === uid);
        if (!staticProject) {
          throw new Error(`Project with UID "${uid}" not found`);
        }
        return staticProject;
      }
      default:
        throw new Error(`Unknown document type: ${type}`);
    }
  }
}

// Replace the createClient function
export const createClient = () => {
  return new StaticClient();
};

// Utility functions to replace Prismic helper functions
export const isFilled = {
  keyText: (text: any): text is string => {
    return typeof text === 'string' && text.length > 0;
  },
  richText: (richText: any): boolean => {
    return Array.isArray(richText) && richText.length > 0;
  },
  link: (link: any): boolean => {
    return link && typeof link.url === 'string' && link.url.length > 0;
  },
  image: (image: any): boolean => {
    return image && typeof image.url === 'string' && image.url.length > 0;
  },
  date: (date: any): boolean => {
    return typeof date === 'string' && date.length > 0;
  }
};

export const asLink = (link: any): string => {
  if (link && link.url) {
    return link.url;
  }
  return '#';
};

export const asImageSrc = (image: any, params?: any): string => {
  if (image && image.url) {
    return image.url;
  }
  return '';
};

// Mock rich text content structure
export const createRichTextElement = (text: string) => [
  {
    type: 'paragraph',
    text,
    spans: []
  }
];
