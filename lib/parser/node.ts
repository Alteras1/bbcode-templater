import { Marker } from './markers';

type NestingNode = {
  type: 'group';
  description: string;
  markerStart: Marker;
  markerEnd?: Marker;
  repeat: boolean;
  children: NodeTree;
};

type RegularNode = {
  type: 'text' | 'content' | 'number' | 'select';
  description: string;
  marker: Marker;
  value?: string | number;
};

type NodeError = { type: 'UnexpectedEnd' | 'InvalidMarker' | 'MissingEnd', marker: Marker; };

type NodeTree = (NestingNode | RegularNode | string)[];

export type { NestingNode, NodeError, NodeTree, RegularNode };