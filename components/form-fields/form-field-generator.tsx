import { NodeTree } from '@/lib/parser/node';
import FormFieldGroup from './form-field-group';
import FormField from './form-field';

/**
 * Handles the creation of form fields based on the parsed node tree
 * @param tree parsed node tree
 * @returns
 */
export default function FormFieldGenerator({ tree }: { tree: NodeTree }) {
  return (
    <div>
      {tree.map((node, index) => {
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
