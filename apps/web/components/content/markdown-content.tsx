import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "markdown-content text-sm leading-relaxed text-muted-foreground sm:text-base",
        "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-foreground",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-foreground",
        "[&_p]:mb-4 [&_p]:leading-relaxed",
        "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:mb-1",
        "[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-medium [&_strong]:text-foreground",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
