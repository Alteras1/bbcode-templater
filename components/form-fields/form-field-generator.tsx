'use client';

import FormFieldGroup from './form-field-group';
import FormField from './form-field';
import { useTemplateContext } from '../template-provider';

/**
 * Handles the creation of form fields based on the parsed node tree
 * @param tree parsed node tree
 * @returns
 */
export function FormFieldGenerator() {
  const { nodeTree } = useTemplateContext();

  return (
    <div>
      {nodeTree.map((node, index) => {
        if (typeof node === 'string') {
          return;
        } else if (node.type === 'group') {
          return <FormFieldGroup key={index} node={node} />;
        } else {
          return <FormField key={index} node={node} />;
        }
      })}
    </div>
  );
}
