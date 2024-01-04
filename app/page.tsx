'use client';

import FormFieldGenerator from '@/components/form-fields/form-field-generator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NodeError, NodeTree } from '@/lib/parser/node';
import { outputTemplateWithValues, parse } from '@/lib/parser/parser';
import { Source_Code_Pro } from 'next/font/google';
import { useState } from 'react';

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], weight: '400' });

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<NodeTree>([]);
  const [errors, setErrors] = useState<NodeError[]>([]);
  const [finalOutput, setFinalOutput] = useState<string>('');

  const parseInput = () => {
    const [output, errors] = parse(input);
    console.log('tree: ', output);
    console.log('errors: ', errors);
    setOutput(output);
    setErrors(errors);
  };

  const outputBBCode = () => {
    console.log(output);
    const generated = outputTemplateWithValues(output);
    console.log(generated);
    setFinalOutput(generated);
  };

  return (
    <main className="flex min-h-screen flex-col items-start gap-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="template-input">Input Template</Label>
        <Textarea
          placeholder="Input your text template here."
          id="template-input"
          onChange={(e) => setInput(e.target.value)}
          className={sourceCodePro.className}
        />
      </div>
      <Button variant="outline" onClick={parseInput}>
        Generate Form Fields
      </Button>
      <label className="form-control relative w-full min-w-full flex-row flex-wrap">
        <label
          htmlFor="debug-toggle"
          className="label-text mr-12 cursor-pointer py-2 pl-1"
        >
          Debug Mode
        </label>
        <input
          id="debug-toggle"
          name="debug-toggle"
          type="checkbox"
          className="toggle toggle-info toggle-sm peer my-2 mr-1"
        />
        <textarea
          name="parsed"
          className={
            sourceCodePro.className +
            ' textarea textarea-bordered hidden h-72 w-full flex-grow basis-full text-sm peer-checked:block'
          }
          placeholder="Parsed input"
          value={JSON.stringify(output, null, 2)}
          readOnly
        ></textarea>
      </label>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Generated Form Fields
      </h2>
      <FormFieldGenerator tree={output} />
      <Button variant="outline" onClick={() => outputBBCode()}>
        Generate Final Output
      </Button>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="template-output">Output</Label>
        <Textarea
          placeholder="Output will appear here."
          id="template-output"
          className={sourceCodePro.className}
          value={finalOutput}
          readOnly
        />
      </div>
    </main>
  );
}
