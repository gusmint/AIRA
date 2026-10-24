import React from 'react';

// Lightweight, safe, robust markdown renderer for AIRA responses
export function FormattedMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-5 my-2 space-y-1.5 text-slate-700">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-5 my-2 space-y-1.5 text-slate-700">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  const parseInline = (text: string): React.ReactNode => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="italic text-slate-800">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-slate-100 text-emerald-800 px-1.5 py-0.5 rounded text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={i} className="text-base font-bold text-slate-800 mt-3 mb-1">
          {parseInline(trimmed.replace(/^###\s+/, ''))}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={i} className="text-lg font-bold text-emerald-950 mt-4 mb-2 border-b border-emerald-100 pb-1">
          {parseInline(trimmed.replace(/^##\s+/, ''))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h2 key={i} className="text-xl font-bold text-emerald-900 mt-4 mb-2">
          {parseInline(trimmed.replace(/^#\s+/, ''))}
        </h2>
      );
      continue;
    }

    // Bullet lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      const itemText = trimmed.replace(/^[-*•]\s+/, '');
      if (currentList && currentList.type === 'ul') {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      }
      continue;
    }

    // Numbered lists
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.+)/);
    if (numMatch) {
      const itemText = numMatch[2];
      if (currentList && currentList.type === 'ol') {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      }
      continue;
    }

    // Blockquote or Callout
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={i} className="border-l-4 border-emerald-500 pl-3 py-1 my-2 bg-emerald-50/60 rounded-r text-sm text-emerald-900 italic">
          {parseInline(trimmed.replace(/^>\s+/, ''))}
        </blockquote>
      );
      continue;
    }

    // Standard paragraph
    flushList();
    elements.push(
      <p key={i} className="my-1.5 leading-relaxed text-slate-700">
        {parseInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1 text-sm md:text-[15px]">{elements}</div>;
}
