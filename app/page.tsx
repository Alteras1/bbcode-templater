'use client';

import FormFieldGenerator from '@/components/form-fields/form-field-generator';
import FormFieldGroup from '@/components/form-fields/form-field-group';
import {
  NestingNode,
  NodeError,
  NodeTree,
  RegularNode,
} from '@/lib/parser/node';
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
    <main className="flex min-h-screen flex-col">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Template Input</span>
        </div>
        <textarea
          name="input"
          className={
            sourceCodePro.className +
            ' textarea textarea-bordered h-24 w-full text-sm'
          }
          placeholder="Input your bbcode template here"
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </label>
      <button className="btn" onClick={parseInput}>
        Generate Form Fields
      </button>
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
          className="peer toggle toggle-info toggle-sm my-2 mr-1"
          defaultChecked
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
      template
      <FormFieldGenerator tree={output} />
      <button className="btn" onClick={() => outputBBCode()}>
        Generate BBCode
      </button>
      <label className="form-control">
        <div className="label">
          <span className="label-text">BBCode Output</span>
        </div>
        <textarea
          name="output"
          className={
            sourceCodePro.className +
            ' textarea textarea-bordered h-24 w-full text-sm'
          }
          placeholder="BBCode output will appear here"
          value={finalOutput}
          readOnly
        ></textarea>
      </label>
    </main>
  );
}
