import Bounded from "../../components/Bounded";
import Heading from "../../components/Heading";
import { isFilled } from "@/utils/static-client";
import { PrismicRichText } from "@/components/StaticComponents";
import ContentList from "./ContentList";
import { getAllBlogPosts, getAllProjects } from "@/db/queries";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = {
  slice: any;
};

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  // Fetch data from database instead of using static data
  const contentType = slice.primary.content_type || "Blog";

  let items: any[] = [];

  try {
    if (contentType === "Blog") {
      const blogPosts = await getAllBlogPosts(true); // Only published posts
      items = blogPosts.map(post => ({
        uid: post.uid,
        data: {
          title: post.title,
          hover_image: post.hoverImage ? { url: post.hoverImage, alt: post.title } : null,
        },
        tags: post.tags && typeof post.tags === 'string' ? post.tags.split(',').map(tag => tag.trim()) : []
      }));
    } else {
      const projects = await getAllProjects(true); // Only published projects
      items = projects.map(project => ({
        uid: project.uid,
        data: {
          title: project.title,
          hover_image: project.hoverImage ? { url: project.hoverImage, alt: project.title } : null,
        },
        tags: project.tags && typeof project.tags === 'string' ? project.tags.split(',').map(tag => tag.trim()) : []
      }));
    }
  } catch (error) {
    console.error('Error fetching content:', error);
    items = [];
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ContentList items={items} contentType={contentType} viewMoreText={slice.primary.view_more_text} fallbackItemImage={slice.primary.fallback_item_image}/>
    </Bounded>
  );
};

export default ContentIndex;
