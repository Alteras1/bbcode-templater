import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation - BBCode Templater',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <article className="prose prose-sm md:prose-base dark:prose-invert prose-slate w-full max-w-4xl flex-grow">
        {children}
      </article>
    </main>
  );
}
