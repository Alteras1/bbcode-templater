'use server';

import { parse } from 'node-html-parser';

type getPastebinError = {
  error: string;
};

type getPastebinResult = {
  id: string,
  metadata: {
    title?: string, author?: string;
  },
  content: string,
};

async function getPastebin(url: string): Promise<getPastebinResult | getPastebinError> {
  const id = url.match(/pastebin\.com\/(raw\/)?(?<pasteId>.+)/)?.groups?.pasteId;
  if (!id) return { error: 'Invalid pastebin url' };

  const [content, error] = await getPastebinContent(id);
  if (error) return { error };

  const metadata = await getPastebinMetadata(id);

  return {
    id,
    metadata,
    content
  };
}

async function getPastebinMetadata(id: string) {
  const res = await fetch(`https://pastebin.com/${id}`, { next: { revalidate: 3600 } });
  const html = await res.text();
  const doc = parse(html);
  const title = doc.querySelector('.info-bar h1')?.textContent;
  const author = doc.querySelector('.username')?.textContent.trim().replaceAll('\n', '');
  return { title, author };
}

async function getPastebinContent(id: string) {
  try {
    const res = await fetch(`https://pastebin.com/raw/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return ['', 'Pastebin does not exist'];
    };
    return [await res.text(), ''];
  } catch {
    return ['', 'Unable to connect to Pastebin'];
  }
}

export type { getPastebinError, getPastebinResult };
export { getPastebin };