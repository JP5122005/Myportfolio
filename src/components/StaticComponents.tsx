import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Replace SliceZone component
interface SliceZoneProps {
  slices: any[];
  components: Record<string, React.ComponentType<any>>;
}

export function SliceZone({ slices, components }: SliceZoneProps) {
  return (
    <>
      {slices.map((slice, index) => {
        const Component = components[slice.slice_type];
        if (!Component) {
          console.warn(`No component found for slice type: ${slice.slice_type}`);
          return null;
        }
        return <Component key={index} slice={slice} />;
      })}
    </>
  );
}

// Replace PrismicRichText component
interface PrismicRichTextProps {
  field: any[];
  components?: Record<string, React.ComponentType<any>>;
}

export function PrismicRichText({ field }: PrismicRichTextProps) {
  if (!field || !Array.isArray(field)) {
    return null;
  }

  return (
    <>
      {field.map((element, index) => {
        switch (element.type) {
          case 'paragraph':
            return <p key={index}>{element.text}</p>;
          case 'heading1':
            return <h1 key={index}>{element.text}</h1>;
          case 'heading2':
            return <h2 key={index}>{element.text}</h2>;
          case 'heading3':
            return <h3 key={index}>{element.text}</h3>;
          case 'list-item':
            return <li key={index}>{element.text}</li>;
          default:
            return <p key={index}>{element.text}</p>;
        }
      })}
    </>
  );
}

// Replace PrismicNextLink component
interface PrismicNextLinkProps {
  field: any;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-current'?: string;
  'aria-label'?: string;
}

export function PrismicNextLink({ 
  field, 
  children, 
  className, 
  onClick, 
  'aria-current': ariaCurrent,
  'aria-label': ariaLabel 
}: PrismicNextLinkProps) {
  const href = field?.url || '#';
  
  return (
    <Link 
      href={href} 
      className={className} 
      onClick={onClick}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

// Replace PrismicNextImage component
interface PrismicNextImageProps {
  field: any;
  className?: string;
  imgixParams?: any;
  alt?: string;
}

export function PrismicNextImage({ field, className, imgixParams, alt }: PrismicNextImageProps) {
  if (!field || !field.url) {
    return null;
  }

  const imageAlt = alt || field.alt || '';

  return (
    <Image
      src={field.url}
      alt={imageAlt}
      width={field.width || 800}
      height={field.height || 800}
      className={className}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

// Replace PrismicPreview component (no-op since we're removing Prismic)
export function PrismicPreview({ repositoryName }: { repositoryName: string }) {
  return null;
}
