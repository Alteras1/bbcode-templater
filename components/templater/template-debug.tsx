'use client';

import { sourceCodePro } from '@/lib/utils';
import { useTemplateContext } from '../template-provider';
import { Checkbox } from '../ui/checkbox';

export function TemplateDebug() {
  const { nodeTree, errors } = useTemplateContext();

  return (
    <>
      <label htmlFor="debug-toggle" className="mr-12 text-sm font-medium leading-none">
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
        value={JSON.stringify(nodeTree, null, 2)}
        readOnly
      ></textarea>
      <textarea
        name="errors"
        className={
          sourceCodePro.className +
          ' textarea textarea-bordered hidden h-72 w-full flex-grow basis-full text-sm peer-checked:block'
        }
        placeholder="errors"
        value={JSON.stringify(errors, null, 2)}
        readOnly
      ></textarea>
    </>
  );
}
