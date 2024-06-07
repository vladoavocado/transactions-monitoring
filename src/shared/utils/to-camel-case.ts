export const toCamelCase = (input: string) =>
  input
    .toLowerCase()
    .replace(/[_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
