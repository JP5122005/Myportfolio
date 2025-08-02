import { eq, desc } from "drizzle-orm";
import { db } from "./index";
import { 
  blogPostsTable, 
  projectsTable, 
  settingsTable, 
  homepageTable,
  type BlogPost,
  type Project,
  type Settings,
  type Homepage,
  type NewBlogPost,
  type NewProject,
  type NewSettings,
  type NewHomepage 
} from "./schema";

// Check if database is available
const isDatabaseAvailable = () => db !== null;

// Settings queries
export async function getSettings(): Promise<Settings | null> {
  if (!isDatabaseAvailable()) return null;
  
  const settings = await db!.select().from(settingsTable).limit(1);
  return settings[0] || null;
}

export async function updateSettings(data: Partial<NewSettings>): Promise<Settings | null> {
  if (!isDatabaseAvailable()) return null;
  
  const existing = await getSettings();
  
  if (existing) {
    const [updated] = await db!.update(settingsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(settingsTable.id, existing.id))
      .returning();
    return updated;
  } else {
    const [created] = await db!.insert(settingsTable)
      .values(data as NewSettings)
      .returning();
    return created;
  }
}

// Homepage queries
export async function getHomepage(): Promise<Homepage | null> {
  if (!isDatabaseAvailable()) return null;
  
  const homepage = await db!.select().from(homepageTable).limit(1);
  return homepage[0] || null;
}

export async function updateHomepage(data: Partial<NewHomepage>): Promise<Homepage | null> {
  if (!isDatabaseAvailable()) return null;
  
  const existing = await getHomepage();
  
  if (existing) {
    const [updated] = await db!.update(homepageTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(homepageTable.id, existing.id))
      .returning();
    return updated;
  } else {
    const [created] = await db!.insert(homepageTable)
      .values(data as NewHomepage)
      .returning();
    return created;
  }
}

// Blog post queries
export async function getAllBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  if (!isDatabaseAvailable()) return [];
  
  const query = db!.select().from(blogPostsTable);
  
  if (publishedOnly) {
    return await query.where(eq(blogPostsTable.published, true))
      .orderBy(desc(blogPostsTable.date));
  }
  
  return await query.orderBy(desc(blogPostsTable.date));
}

export async function getBlogPostByUid(uid: string): Promise<BlogPost | null> {
  if (!isDatabaseAvailable()) return null;
  
  const posts = await db!.select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.uid, uid))
    .limit(1);
  
  return posts[0] || null;
}

export async function createBlogPost(data: NewBlogPost): Promise<BlogPost> {
  if (!isDatabaseAvailable()) throw new Error('Database not available');
  
  const [created] = await db!.insert(blogPostsTable)
    .values({ ...data, createdAt: new Date(), updatedAt: new Date() })
    .returning();
  
  return created;
}

export async function updateBlogPost(uid: string, data: Partial<NewBlogPost>): Promise<BlogPost | null> {
  if (!isDatabaseAvailable()) return null;
  
  const [updated] = await db!.update(blogPostsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(blogPostsTable.uid, uid))
    .returning();
  
  return updated || null;
}

export async function deleteBlogPost(uid: string): Promise<boolean> {
  if (!isDatabaseAvailable()) return false;
  
  const result = await db!.delete(blogPostsTable)
    .where(eq(blogPostsTable.uid, uid));
  
  return result.rowCount > 0;
}

// Project queries
export async function getAllProjects(publishedOnly = true): Promise<Project[]> {
  if (!isDatabaseAvailable()) return [];
  
  const query = db!.select().from(projectsTable);
  
  if (publishedOnly) {
    return await query.where(eq(projectsTable.published, true))
      .orderBy(desc(projectsTable.date));
  }
  
  return await query.orderBy(desc(projectsTable.date));
}

export async function getProjectByUid(uid: string): Promise<Project | null> {
  if (!isDatabaseAvailable()) return null;
  
  const projects = await db!.select()
    .from(projectsTable)
    .where(eq(projectsTable.uid, uid))
    .limit(1);
  
  return projects[0] || null;
}

export async function createProject(data: NewProject): Promise<Project> {
  if (!isDatabaseAvailable()) throw new Error('Database not available');
  
  const [created] = await db!.insert(projectsTable)
    .values({ ...data, createdAt: new Date(), updatedAt: new Date() })
    .returning();
  
  return created;
}

export async function updateProject(uid: string, data: Partial<NewProject>): Promise<Project | null> {
  if (!isDatabaseAvailable()) return null;
  
  const [updated] = await db!.update(projectsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projectsTable.uid, uid))
    .returning();
  
  return updated || null;
}

export async function deleteProject(uid: string): Promise<boolean> {
  if (!isDatabaseAvailable()) return false;
  
  const result = await db!.delete(projectsTable)
    .where(eq(projectsTable.uid, uid));
  
  return result.rowCount > 0;
}
