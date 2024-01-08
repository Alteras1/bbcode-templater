'use client';

import type { getPastebinResult } from '@/app/(pastebin)/actions';
import { SearchPastebin } from './search-pastebin';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTemplateContext } from '@/components/template-provider';
import { Button } from '@/components/ui/button';
import { sourceCodePro } from '@/lib/utils';
import { parse } from '@/lib/parser/parser';

export function TemplateInput({ pastebin }: { pastebin: { url: string; error?: string; content: getPastebinResult } }) {
  const { templateInput, setTemplateInput, setNodeTree, setErrors } = useTemplateContext();

  const parseInput = () => {
    console.log('parsing input');
    const [output, errors] = parse(templateInput);
    setNodeTree(output);
    setErrors(errors);
  };

  return (
    <div className="grid w-full gap-1.5">
      <SearchPastebin defaultValue={pastebin.url} result={pastebin.content} error={pastebin.error} />
      <Label htmlFor="template-input">Input Template</Label>
      <Textarea
        placeholder="Input your text template here."
        id="template-input"
        onChange={(e) => setTemplateInput(e.target.value)}
        value={templateInput}
        className={sourceCodePro.className}
      />
      <Button variant="outline" onClick={() => parseInput()}>
        Generate Form Fields
      </Button>
    </div>
  );
}
