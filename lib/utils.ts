import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseContent(content: string): { originalText: string; codeBlocks: { lang: string; content: string }[] } {
  const originalText = content;
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  const codeBlocks: { lang: string; content: string }[] = [];

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    codeBlocks.push({
      lang: match[1],
      content: match[2].trim()
    });
  }

  return {
    originalText,
    codeBlocks
  };
}

export function getFirstCodeBlock(content: string, type?: string): string | null {
  const { codeBlocks } = parseContent(content);

  if (type) {
    const matchingBlock = codeBlocks.find(block => block.lang.toLowerCase() === type.toLowerCase());
    return matchingBlock ? matchingBlock.content : null;
  }

  if (codeBlocks.length > 0) {
    return codeBlocks[0].content;
  }

  return null;
}
