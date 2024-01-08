'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { getPastebinResult } from '@/app/(pastebin)/actions';
import { usePathname, useRouter } from 'next/navigation';

export function SearchPastebin({
  defaultValue,
  result,
  error,
}: {
  defaultValue: string;
  result?: getPastebinResult;
  error?: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  async function getPastebin(formData: FormData) {
    const pastebinUrl = formData.get('pastebin') as string;
    const id = pastebinUrl.match(/pastebin\.com\/(raw\/)?(?<pasteId>\w+)/)?.groups?.pasteId;
    if (!id) {
      return {
        errors: 'Invalid pastebin url',
      };
    }

    replace(pathname + '?pastebin=' + id);
  }

  return (
    <form action={getPastebin}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="pastebin">Pastebin URL</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="url"
            id="pastebin"
            name="pastebin"
            placeholder="https://pastebin.com/..."
            defaultValue={defaultValue}
            pattern="(.*)pastebin\.com\/(raw\/)?(\w+)"
            required
          />
          <Button type="submit">Get Template</Button>
        </div>
      </div>
    </form>
  );
}
