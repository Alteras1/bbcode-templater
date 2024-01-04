'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { Icons } from './icons';
import { usePathname } from 'next/navigation';
import { Menu, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Separator } from './ui/separator';

const links = {
  home: '/',
  icons: {
    github: 'https://github.com/Alteras1/text-templater',
  },
  standard: [
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Documentation',
      href: '/docs',
    },
  ],
};

export function NavLinks() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // a one way set that just closes the mobile menu when a link is clicked

  return (
    <nav className="flex w-full items-center justify-end text-sm">
      <input
        type="checkbox"
        className="mobile-menu peer hidden"
        name="mobile-menu"
        id="mobile-menu"
        checked={mobileMenuOpen}
        onChange={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <label
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
          }),
          'mobile-menu-icons flex sm:hidden'
        )}
        htmlFor="mobile-menu"
      >
        <Menu className="mobile-menu-icon-open h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <XIcon className="mobile-menu-icon-close absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
        <span className="sr-only">Menu</span>
      </label>

      <div className="mobile-menu-content pointer-events-none absolute left-0 top-full block w-full peer-checked:pointer-events-auto sm:pointer-events-auto sm:relative">
        <div
          className="mobile-menu-content-wrapper relative flex w-full flex-col items-center
                    border-b border-border/40 bg-background/95 px-4
                    backdrop-blur transition-all [clip-path:inset(0_0_100%_0)] supports-[backdrop-filter]:bg-background/60
                    sm:relative sm:flex-row sm:justify-end sm:border-b-0 sm:bg-transparent
                    sm:p-0 sm:backdrop-blur-none sm:[clip-path:unset]"
        >
          <Separator
            orientation="horizontal"
            decorative={true}
            className="mx-2 mb-2 sm:hidden"
          />
          <Link
            href="/"
            className="mx-3 my-1 block text-base text-foreground/60 transition-colors hover:text-foreground/80 sm:my-0 sm:hidden sm:text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          {links.standard.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={cn(
                path.startsWith(href)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                'mx-3 my-1 block text-base transition-colors hover:text-foreground/80 sm:my-0 sm:text-sm'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Separator
            orientation="horizontal"
            decorative={true}
            className="my-2 sm:hidden"
          />
          <div className="mb-2 flex h-10 items-center space-x-2 sm:mb-0 sm:space-x-0">
            <Link href={links.icons.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost-sm',
                    size: 'icon',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Separator
              orientation="vertical"
              decorative={true}
              className="sm:hidden"
            />

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
