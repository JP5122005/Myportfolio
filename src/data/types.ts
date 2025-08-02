// Static data types to replace Prismic types

export interface StaticImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface StaticLink {
  url: string;
  text?: string;
  target?: string;
}

export interface StaticRichText {
  type: string;
  text?: string;
  spans?: any[];
}

export interface StaticSettings {
  meta_title: string;
  meta_description: string;
  name: string;
  nav_item: Array<{
    link: StaticLink;
    label: string;
  }>;
  cta_link: StaticLink;
  cta_label: string;
  github_link: StaticLink;
  twitter_link: StaticLink;
  linkedin_link: StaticLink;
}

export interface StaticPage {
  meta_title: string;
  meta_description: string;
  slices: StaticSlice[];
}

export interface StaticSlice {
  slice_type: string;
  variation: string;
  primary: any;
  items?: any[];
}

export interface StaticBlogPost {
  uid: string;
  data: {
    title: string;
    hover_image?: StaticImage;
  };
  tags: string[];
}

export interface StaticProject {
  uid: string;
  data: {
    title: string;
    hover_image?: StaticImage;
  };
  tags: string[];
}
