import { 
  pgTable, 
  serial, 
  text, 
  integer, 
  timestamp, 
  jsonb,
  pgEnum,
  varchar,
  boolean 
} from 'drizzle-orm/pg-core';

// Settings table for site configuration
export const settingsTable = pgTable('settings', {
  id: serial('id').primaryKey(),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  name: text('name').notNull(),
  navItems: jsonb('nav_items').notNull(),
  ctaLink: text('cta_link').notNull(),
  ctaLabel: text('cta_label').notNull(),
  githubLink: text('github_link'),
  twitterLink: text('twitter_link'),
  linkedinLink: text('linkedin_link'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Blog posts table
export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  uid: varchar('uid', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  date: varchar('date', { length: 10 }).notNull(), // YYYY-MM-DD format
  hoverImageUrl: text('hover_image_url'),
  hoverImageAlt: text('hover_image_alt'),
  slices: jsonb('slices').notNull(),
  tags: jsonb('tags').notNull(),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Projects table
export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  uid: varchar('uid', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  date: varchar('date', { length: 10 }).notNull(), // YYYY-MM-DD format
  hoverImageUrl: text('hover_image_url'),
  hoverImageAlt: text('hover_image_alt'),
  slices: jsonb('slices').notNull(),
  tags: jsonb('tags').notNull(),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Homepage configuration table
export const homepageTable = pgTable('homepage', {
  id: serial('id').primaryKey(),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  slices: jsonb('slices').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Types for better TypeScript support
export type Settings = typeof settingsTable.$inferSelect;
export type NewSettings = typeof settingsTable.$inferInsert;

export type BlogPost = typeof blogPostsTable.$inferSelect;
export type NewBlogPost = typeof blogPostsTable.$inferInsert;

export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;

export type Homepage = typeof homepageTable.$inferSelect;
export type NewHomepage = typeof homepageTable.$inferInsert;
