/**
 * @file marker.ts
 * Lists all types of markers and their properties
 */

import { DELIMITER, SEPARATOR } from './utils';

type Marker = {
  type: string;
  description: string;
  defaultValue?: number | string;
  min?: number;
  max?: number;
  options?: string[];
  repeat?: boolean;
  error?: string;
  indices?: [number, number];
  original: string;
};

const text = (input: string): Marker => {
  const [description, type, defaultValue = ''] = input.split(SEPARATOR);
  return {
    type: 'text',
    description: description.trim(),
    defaultValue: defaultValue.trim(),
    original: DELIMITER + input + DELIMITER
  };
};

const content = (input: string): Marker => {
  const description = input.slice(0, input.indexOf(SEPARATOR));
  return {
    type: 'content',
    description: description.trim(),
    original: DELIMITER + input + DELIMITER
  };
};

const number = (input: string): Marker => {
  const [
    description,
    type,
    inputDefaultValue = '',
    inputMin = '',
    inputMax = ''
  ] = input.split(SEPARATOR);

  const defaultValue = inputDefaultValue ? Number(inputDefaultValue) : NaN;
  const min = inputMin ? Number(inputMin) : NaN;
  const max = inputMax ? Number(inputMax) : NaN;
  let error;
  if (max < min) {
    error = `Max value is smaller than min value`;
  }

  return {
    type: 'number',
    description: description.trim(),
    defaultValue,
    min,
    max,
    error,
    original: DELIMITER + input + DELIMITER
  };
};

const select = (input: string): Marker => {
  const [
    description,
    type,
    ...options
  ] = input.split(SEPARATOR);

  if (options.length === 0) {
    return {
      type: 'select',
      description: description.trim(),
      options: [],
      original: DELIMITER + input + DELIMITER,
      error: 'No options provided'
    };
  }
  const optionsList = options.map(option => option.trim());

  return {
    type: 'select',
    description: description.trim(),
    options: optionsList,
    original: DELIMITER + input + DELIMITER
  };
};

const group = (input: string): Marker => {
  const [description, type, repeat] = input.split(SEPARATOR);
  const repeatable = repeat?.trim().toLowerCase() === 'repeat';
  return {
    type: 'group',
    description: description.trim(),
    original: DELIMITER + input + DELIMITER,
    repeat: repeatable
  };
};

const end = (input: string): Marker => {
  return {
    type: 'end',
    description: input.split(SEPARATOR)[0].trim(),
    original: DELIMITER + input + DELIMITER
  };
};

const markerList = {
  'text': text,
  'content': content,
  'number': number,
  'select': select,
  'group': group,
  'end': end
};

export {
  text,
  content,
  number,
  select,
  group,
  end,
  markerList
};

export type { Marker };