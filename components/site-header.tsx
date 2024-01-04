import Link from 'next/link';
import { TextCursorInput } from 'lucide-react';
import { NavLinks } from './nav-links';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <TextCursorInput strokeWidth={1.5} />
          <span className="inline-block font-bold">Text Templater</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 sm:justify-end">
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
