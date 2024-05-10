'use client';

import { NodeError, NodeTree } from '@/lib/parser/node';
import { parse } from '@/lib/parser/parser';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type TemplateContextType = {
  nodeTree: NodeTree;
  setNodeTree: Dispatch<SetStateAction<NodeTree>>;
  errors: NodeError[];
  setErrors: Dispatch<SetStateAction<NodeError[]>>;
};

const TemplateContext = createContext<TemplateContextType>(undefined as any as TemplateContextType);

function TemplateProvider({ templateInit, children }: { templateInit: string; children: React.ReactNode }) {
  let nodeTreeInit: NodeTree = [];
  let errorsInit: NodeError[] = [];
  if (templateInit) {
    const [nodeTree, errors] = parse(templateInit);
    errorsInit = errors;
    nodeTreeInit = nodeTree;
  }

  const [nodeTree, setNodeTree] = useState<NodeTree>(nodeTreeInit);
  const [errors, setErrors] = useState<NodeError[]>(errorsInit);

  return (
    <TemplateContext.Provider value={{ nodeTree, setNodeTree, errors, setErrors }}>{children}</TemplateContext.Provider>
  );
}

const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplateContext must be used within a TemplateProvider');
  }
  return context;
};

export { TemplateProvider, TemplateContext, useTemplateContext };
