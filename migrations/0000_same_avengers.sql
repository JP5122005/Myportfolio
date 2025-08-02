CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" varchar(255) NOT NULL,
	"title" text NOT NULL,
	"date" varchar(10) NOT NULL,
	"hover_image_url" text,
	"hover_image_alt" text,
	"slices" jsonb NOT NULL,
	"tags" jsonb NOT NULL,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_posts_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "homepage" (
	"id" serial PRIMARY KEY NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"slices" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" varchar(255) NOT NULL,
	"title" text NOT NULL,
	"date" varchar(10) NOT NULL,
	"hover_image_url" text,
	"hover_image_alt" text,
	"slices" jsonb NOT NULL,
	"tags" jsonb NOT NULL,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"name" text NOT NULL,
	"nav_items" jsonb NOT NULL,
	"cta_link" text NOT NULL,
	"cta_label" text NOT NULL,
	"github_link" text,
	"twitter_link" text,
	"linkedin_link" text,
	"updated_at" timestamp DEFAULT now()
);
