export const DELIMITER = '&';
export const SEPARATOR = '\\';

export const isDelimiter = (char: string) => {
  return char === DELIMITER;
};
export const isSeparator = (char: string) => {
  return char === SEPARATOR;
};