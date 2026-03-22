interface PostContentProps {
  htmlContent: string;
}

export function PostContent({ htmlContent }: PostContentProps) {
  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
