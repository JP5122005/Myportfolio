import Bounded from "../../components/Bounded";
import Heading from "../../components/Heading";
import { isFilled } from "@/utils/static-client";
import { PrismicRichText } from "@/components/StaticComponents";
import ContentList from "./ContentList";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = {
  slice: any;
};

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = ({
  slice,
}: ContentIndexProps): JSX.Element => {
  // Use static data directly instead of async client calls
  const contentType = slice.primary.content_type || "Blog";

  // Import static data directly
  const { staticBlogPosts, staticProjects } = require("@/data/static-data");
  const items = contentType === "Blog" ? staticBlogPosts : staticProjects;


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
