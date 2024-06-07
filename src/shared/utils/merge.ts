import { toCamelCase } from 'src/shared/utils/to-camel-case';

export const merge = <T extends Record<string, any>>(data: T, context: any) => {
  Object.entries(data).forEach(([key, value]) => {
    const transformedKey = toCamelCase(key);

    if (transformedKey in context) {
      context[transformedKey] = value;
    }
  });
};
