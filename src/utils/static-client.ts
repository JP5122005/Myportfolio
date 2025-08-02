import { staticSettings, staticHomepage, staticBlogPosts, staticProjects } from '@/data/static-data';
import { StaticSettings, StaticPage, StaticBlogPost, StaticProject } from '@/data/types';

// Mock client to replace Prismic client functionality
export class StaticClient {
  async getSingle(type: string): Promise<any> {
    switch (type) {
      case 'settings':
        return { data: staticSettings };
      case 'homepage':
        return { data: staticHomepage };
      default:
        throw new Error(`Unknown document type: ${type}`);
    }
  }

  async getAllByType(type: string): Promise<any[]> {
    switch (type) {
      case 'blog_post':
        return staticBlogPosts;
      case 'project':
        return staticProjects;
      default:
        return [];
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
