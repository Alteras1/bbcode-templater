'use client';

import parse from '@/lib/parser';
import { Source_Code_Pro } from 'next/font/google';
import { useState } from 'react';

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], weight: '400' });

export default function Home() {
  const [parsed, setParsed] = useState('');

  const parseInput = (input: string) => {
    setParsed(parse(input));
  };

  return (
    <main className="flex min-h-screen flex-col">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Template Input</span>
        </div>
        <textarea
          className={
            sourceCodePro.className +
            ' textarea textarea-bordered h-24 w-full text-sm'
          }
          placeholder="Input your bbcode template here"
          onChange={(e) => parseInput(e.target.value)}
        ></textarea>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Parsed Input</span>
        </div>
        <textarea
          className={
            sourceCodePro.className +
            ' textarea textarea-bordered h-24 w-full text-sm'
          }
          placeholder="Parsed input"
          value={parsed}
          readOnly
        ></textarea>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">BBCode Output</span>
        </div>
        <textarea
          className={
            sourceCodePro.className +
            ' textarea textarea-bordered h-24 w-full text-sm'
          }
          placeholder="BBCode output will appear here"
          readOnly
        ></textarea>
      </label>
    </main>
  );
}
