import { NestingNode, NodeTree } from '@/lib/parser/node';
import FormField from './form-field';
import { useState } from 'react';

function FormFieldGroupItem({ group }: { group: NodeTree }) {
  return group.map((childNode, index) => {
    if (typeof childNode === 'string') {
      return childNode;
    } else if (childNode.type === 'group') {
      return <FormFieldGroup key={index} node={childNode} />;
    } else {
      return <FormField key={index} node={childNode} />;
    }
  });
}

export default function FormFieldGroup({ node }: { node: NestingNode }) {
  const [childrenNodes, setChildrenNodes] = useState<NodeTree[]>([]);
  const [version, setVersion] = useState<number>(0);
  const duplicateChildren = () => {
    const newChild = structuredClone(node.originalChildren);
    node.children.push(newChild);
    setChildrenNodes([...node.children]);
  };

  const removeChildren = (index: number) => {
    node.children = node.children.filter((_, i) => index !== i);
    setVersion(version + 1);
    setChildrenNodes([...node.children]);
  };

  if (node.children.length === 0) {
    duplicateChildren();
  }

  return (
    <>
      {childrenNodes.map((group, index) => {
        return (
          <fieldset
            className="border-2 border-primary p-3"
            key={version + '_' + index}
          >
            <legend className="">Group: {node.description}</legend>
            {childrenNodes.length > 1 &&
              (index === 0 ? <>Original</> : <>Clone of {node.description}</>)}
            {index === 0 && node.repeat && (
              <button className="btn" onClick={duplicateChildren}>
                Add
              </button>
            )}
            {index !== 0 && (
              <button className="btn" onClick={() => removeChildren(index)}>
                Remove
              </button>
            )}
            <FormFieldGroupItem group={group} />
          </fieldset>
        );
      })}
    </>
  );
}
