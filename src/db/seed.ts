import { db } from "./index";
import { 
  blogPostsTable, 
  projectsTable, 
  settingsTable, 
  homepageTable 
} from "./schema";
import { 
  staticSettings, 
  staticHomepage, 
  staticBlogPosts, 
  staticProjects 
} from "../data/static-data";

async function seed() {
  try {
    console.log("🌱 Seeding database with static data...");

    // Clear existing data
    await db.delete(blogPostsTable);
    await db.delete(projectsTable);
    await db.delete(settingsTable);
    await db.delete(homepageTable);

    // Insert settings
    console.log("📝 Inserting settings...");
    await db.insert(settingsTable).values({
      metaTitle: staticSettings.meta_title,
      metaDescription: staticSettings.meta_description,
      name: staticSettings.name,
      navItems: staticSettings.nav_item,
      ctaLink: staticSettings.cta_link.url,
      ctaLabel: staticSettings.cta_label,
      githubLink: staticSettings.github_link.url,
      twitterLink: staticSettings.twitter_link.url,
      linkedinLink: staticSettings.linkedin_link.url,
    });

    // Insert homepage
    console.log("🏠 Inserting homepage...");
    await db.insert(homepageTable).values({
      metaTitle: staticHomepage.meta_title,
      metaDescription: staticHomepage.meta_description,
      slices: staticHomepage.slices,
    });

    // Insert blog posts
    console.log("📚 Inserting blog posts...");
    for (const post of staticBlogPosts) {
      await db.insert(blogPostsTable).values({
        uid: post.uid,
        title: post.data.title,
        date: post.data.date,
        hoverImageUrl: post.data.hover_image?.url || null,
        hoverImageAlt: post.data.hover_image?.alt || null,
        slices: post.data.slices,
        tags: post.tags,
        published: true,
      });
    }

    // Insert projects
    console.log("🚀 Inserting projects...");
    for (const project of staticProjects) {
      await db.insert(projectsTable).values({
        uid: project.uid,
        title: project.data.title,
        date: project.data.date,
        hoverImageUrl: project.data.hover_image?.url || null,
        hoverImageAlt: project.data.hover_image?.alt || null,
        slices: project.data.slices,
        tags: project.tags,
        published: true,
      });
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seed };
