import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | BBCode Templater',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <article className="prose prose-sm prose-slate w-full max-w-4xl flex-grow md:prose-base dark:prose-invert">
        {children}
      </article>
    </main>
  );
}
