'use client';

import { useEffect, useState } from 'react';

export default function ThemeController() {
  const [theme, setTheme] = useState(
    global?.localStorage?.getItem('theme') || ''
  );
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setHtmlDataThemeAttribute = (theme: string) => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
  };
  setHtmlDataThemeAttribute(theme);

  const handleChange = (e: { target: { value: any } }) => {
    setTheme(e.target.value);
    setHtmlDataThemeAttribute(e.target.value);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Light"
            value="light"
            checked={theme === 'light'}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Dark"
            value="dark"
            checked={theme === 'dark'}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Retro"
            value="retro"
            checked={theme === 'retro'}
            onChange={handleChange}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Auto"
            value=""
            checked={theme === ''}
            onChange={handleChange}
          />
        </li>
        <input
          type="radio"
          name="theme-dropdown"
          className="hidden"
          defaultChecked
          disabled
        />
      </ul>
    </div>
  );
}
