'use client';

import { NodeError, NodeTree } from '@/lib/parser/node';
import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type TemplateContextType = {
  templateInput: string;
  setTemplateInput: Dispatch<SetStateAction<string>>;
  nodeTree: NodeTree;
  setNodeTree: Dispatch<SetStateAction<NodeTree>>;
  errors: NodeError[];
  setErrors: Dispatch<SetStateAction<NodeError[]>>;
};

const TemplateContext = createContext<TemplateContextType>(undefined as any as TemplateContextType);

function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [templateInput, setTemplateInput] = useState('');
  const [nodeTree, setNodeTree] = useState<NodeTree>([]);
  const [errors, setErrors] = useState<NodeError[]>([]);

  return (
    <TemplateContext.Provider value={{ templateInput, setTemplateInput, nodeTree, setNodeTree, errors, setErrors }}>
      {children}
    </TemplateContext.Provider>
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
