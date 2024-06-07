const FIRST_LETTER_OF_WORD_REGEX = /(?:^\w|[A-Z]|\b\w)/g;
const WHITESPACES_REGEX = /\s+/g;

export const toCamelCase = (input: string) =>
  input
    .replace(FIRST_LETTER_OF_WORD_REGEX, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(WHITESPACES_REGEX, '');
