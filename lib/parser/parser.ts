import { markerList } from './markers';
import type { Marker } from './markers';
import { NestingNode, NodeError, NodeTree, RegularNode } from './node';
import { SEPARATOR, isDelimiter } from './utils';

function parse(input: string) {
  const orderOfMarkers = buildOrderOfMarkers(input);
  return buildTree(orderOfMarkers);
}

/**
 * Processes input string and returns a flat array of markers and strings in the order they appear in the input. Does not check for validity of markers.
 * Marker creation will generate errors if markers are invalid, but will still return the marker.
 * @param input string to parse
 * @returns flat array of markers and strings in the order they appear in the input
 */
function buildOrderOfMarkers(input: string) {
  const delimiterIndices = [];

  for (let i = 0; i < input.length; i++) {
    if (isDelimiter(input[i])) {
      delimiterIndices.push(i);
    }
  }

  if (delimiterIndices.length < 2) {
    // Delimiter only appeared once or not at all
    // no actual marker to build
    return [input];
  }

  const orderOfMarkers: (Marker | string)[] = [];
  let lastIndex = 0;
  const markerListNames = Object.keys(markerList);

  for (let i = 0; i < delimiterIndices.length; i++) {
    // For each delimiter, check if it's a marker
    const delimiterIndex = delimiterIndices[i];
    const nextDelimiterIndex = delimiterIndices[i + 1];
    const possibleMarker = input.slice(delimiterIndex + 1, nextDelimiterIndex);
    if (possibleMarker.indexOf(SEPARATOR) === -1) {
      // No separator, not a marker
      continue;
    }

    const markerType = possibleMarker.split(SEPARATOR)[1].trim().toLowerCase();
    if (!markerListNames.includes(markerType)) {
      // Possible marker is not an actual marker
      continue;
    }

    // Possible marker is an actual marker
    const marker = markerList[markerType as keyof typeof markerList](possibleMarker);
    marker.indices = [delimiterIndex, nextDelimiterIndex];

    // Add text before marker
    orderOfMarkers.push(input.slice(lastIndex, delimiterIndex));
    orderOfMarkers.push(marker);
    lastIndex = nextDelimiterIndex + 1;
    i++;
  }
  orderOfMarkers.push(input.slice(lastIndex));

  return orderOfMarkers;
}

/**
 * Builds a tree of nesting nodes and regular nodes and errors from a flat array of markers and strings in the order they appear in the input.
 * @param orderOfMarkers flat array of markers and strings in the order they appear in the input
 * @returns tree of nesting nodes and regular nodes and errors
 */
function buildTree(orderOfMarkers: (Marker | string)[]): [NodeTree, NodeError[]] {
  const tree: NodeTree = [];
  let parentNodes: NestingNode[] = [];  // list of nesting nodes above current nesting node. does not include current nesting node
  let currentNestingNode: NestingNode | null = null;
  const errors: NodeError[] = [];

  for (const marker of orderOfMarkers) {
    if (typeof marker === 'string') {
      if (currentNestingNode === null) {
        tree.push(marker);
      } else {
        currentNestingNode.originalChildren.push(marker);
      }
      continue;
    }
    if (marker.type === 'group') {
      const node: NestingNode = {
        type: 'group',
        description: marker.description,
        markerStart: marker,
        repeat: marker.repeat!,
        originalChildren: [],
        children: [],
      };
      if (currentNestingNode === null) {
        tree.push(node);
      } else {
        parentNodes.push(currentNestingNode);
        currentNestingNode.originalChildren.push(node);
      }
      currentNestingNode = node;
      continue;
    }
    if (marker.type === 'end') {
      if (currentNestingNode === null) {
        // unexpected end found
        errors.push({
          type: 'UnexpectedEnd',
          marker
        });
        // do nothing
        tree.push(marker.original);
      } else {
        currentNestingNode.markerEnd = marker;
        currentNestingNode = parentNodes.pop() || null;
      }
      continue;
    }
    const node: RegularNode = {
      type: marker.type as RegularNode['type'],
      description: marker.description,
      marker: marker
    };
    if (currentNestingNode === null) {
      tree.push(node);
    } else {
      currentNestingNode.originalChildren.push(node);
    }
    if (marker.error) {
      errors.push({
        type: 'InvalidMarker',
        marker
      });
    }
  }

  if (currentNestingNode !== null) {
    errors.push({
      type: 'MissingEnd',
      marker: currentNestingNode.markerStart
    });
  }

  return [tree, errors];
}

/**
 * Walks the tree and returns a string with user input values.
 * @param formFieldTree parsed tree with user input
 * @returns string with user input values
 */
function outputTemplateWithValues(formFieldTree: NodeTree) {
  let final = '';
  for (const node of formFieldTree) {
    if (typeof node === 'string') {
      final += node;
    } else if (node.type === 'group') {
      final += node.children.map((val) => outputTemplateWithValues(val)).join('');
    } else {
      final += node.value || node.marker.original;
    }
  }
  return final;
};

export { parse, outputTemplateWithValues };
export type { Marker };