import { NestingNode, NodeTree } from '@/lib/parser/node';
import FormField from './form-field';
import { useState } from 'react';
import { Button } from '../ui/button';

function FormFieldGroupItem({ group, depth }: { group: NodeTree; depth: number }) {
  return group.map((childNode, index) => {
    if (typeof childNode === 'string') {
      return;
    } else if (childNode.type === 'group') {
      return <FormFieldGroup key={index} node={childNode} depth={depth} />;
    } else {
      return <FormField key={index} node={childNode} />;
    }
  });
}

export default function FormFieldGroup({ node, depth = 1 }: { node: NestingNode; depth?: number }) {
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

  const header = () => {
    switch (depth) {
      case 1:
        return (
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{node.description}</h2>
        );
      case 2:
        return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{node.description}</h3>;
      case 3:
        return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{node.description}</h4>;
      default:
        return <div className="text-lg font-semibold">{node.description}</div>;
    }
  };

  return (
    <>
      {childrenNodes.map((group, index) => {
        return (
          <div key={version + '_' + index} className="flex flex-col items-start gap-2 border-l-2 pl-4">
            {header()}
            {childrenNodes.length > 1 && (index === 0 ? <>Original</> : <>Clone of {node.description}</>)}
            {index === 0 && node.repeat && (
              <Button variant="outline" size="sm" onClick={duplicateChildren}>
                Duplicate
              </Button>
            )}
            {index !== 0 && (
              <Button variant="outline" size="sm" onClick={() => removeChildren(index)}>
                Remove
              </Button>
            )}
            <div className="flex w-full flex-col gap-4">
              <FormFieldGroupItem group={group} depth={depth + 1} />
            </div>
          </div>
        );
      })}
    </>
  );
}
