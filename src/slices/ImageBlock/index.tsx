import { PrismicNextImage } from "@/components/StaticComponents";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = {
  slice: any;
};

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <PrismicNextImage field={slice.primary.image} imgixParams={{w: 600}} />
  );
};

export default ImageBlock;
