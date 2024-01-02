import { NestingNode, NodeTree } from '@/lib/parser/node';
import FormField from './form-field';
import { useState } from 'react';

export default function FormFieldGroup({ node }: { node: NestingNode }) {
  const [childrenNodes, setChildrenNodes] = useState<NodeTree[]>([]);
  const duplicateChildren = () => {
    const newChild = structuredClone(node.originalChildren);
    node.children.push(newChild);
    setChildrenNodes([...node.children]);
  };

  if (node.children.length === 0) {
    duplicateChildren();
  }

  const groupContent = (group: NodeTree) => {
    return group.map((childNode, index) => {
      if (typeof childNode === 'string') {
        return childNode;
      } else if (childNode.type === 'group') {
        return <FormFieldGroup key={index} node={childNode} />;
      } else {
        return <FormField key={index} node={childNode} />;
      }
    });
  };

  return (
    <>
      {childrenNodes.map((group, index) => {
        return (
          <fieldset className="border-2 border-primary p-3" key={index}>
            <legend className="">Group: {node.description}</legend>
            {childrenNodes.length > 1 &&
              (index === 0 ? <>Original</> : <>Clone of {node.description}</>)}
            {index === 0 && node.repeat && (
              <button className="btn" onClick={duplicateChildren}>
                Add
              </button>
            )}
            {groupContent(group)}
          </fieldset>
        );
      })}
    </>
  );
}
