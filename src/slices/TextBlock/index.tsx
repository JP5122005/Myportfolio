import { PrismicRichText } from "@/components/StaticComponents";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = {
  slice: any;
};

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className="max-w-prose">
      <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlock;
