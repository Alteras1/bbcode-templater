import { NestingNode, RegularNode } from '@/lib/parser/node';
import FormField from './form-field';

export default function FormFieldGroup({ node }: { node: NestingNode }) {
  return (
    <fieldset className="border-2 border-primary p-3">
      <legend className="">Group: {node.description}</legend>
      {node.children.map((childNode, index) => {
        if (typeof childNode === 'string') {
          return childNode;
        } else if (childNode.type === 'group') {
          return <FormFieldGroup key={index} node={childNode} />;
        } else {
          return <FormField key={index} node={childNode} />;
        }
      })}
    </fieldset>
  );
}
