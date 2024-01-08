'use client';

import { useTemplateContext } from '@/components/template-provider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { outputTemplateWithValues } from '@/lib/parser/parser';
import { useState } from 'react';
import { sourceCodePro } from '@/lib/utils';

export function GenerateOutput() {
  const [output, setOutput] = useState('');
  const { nodeTree } = useTemplateContext();

  const outputBBCode = () => {
    const generated = outputTemplateWithValues(nodeTree);
    console.log(generated);
    setOutput(generated);
  };

  return (
    <>
      <Button variant="outline" onClick={() => outputBBCode()}>
        Generate Final Output
      </Button>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="template-output">Output</Label>
        <Textarea
          placeholder="Output will appear here."
          id="template-output"
          className={sourceCodePro.className}
          value={output}
          readOnly
        />
      </div>
    </>
  );
}
