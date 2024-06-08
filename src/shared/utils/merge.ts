import { toCamelCase } from 'src/shared/utils/to-camel-case';

/**
 * Recursively transforms the keys of an object or an array to camel case.
 * @param obj The object or array to transform.
 * @returns A new object or array with camel case keys.
 */
const transformKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    // If the input is an array, map over each element and apply the transformation recursively.
    return obj.map(transformKeysToCamelCase);
  }
  if (obj !== null && typeof obj === 'object') {
    // If the input is an object, iterate over its keys.
    return Object.keys(obj).reduce((acc, key) => {
      // Transform the current key to camel case.
      const camelCaseKey = toCamelCase(key);

      // Recursively apply the transformation to the value of the current key.
      acc[camelCaseKey] = transformKeysToCamelCase(obj[key]);

      return acc;
    }, {} as Record<string, any>);
  }

  // If the input is neither an array nor an object, return it as is.
  return obj;
};

/**
 * Merges the transformed data into the context object.
 * @param data The data to merge.
 * @param context The context object to merge the data into.
 */
export const merge = <T extends Record<string, any>>(data: T, context: any) => {
  // Transform the keys of the data to camel case.
  const transformedData = transformKeysToCamelCase(data);

  // Iterate over the transformed data and merge it into the context object.
  Object.entries(transformedData).forEach(([key, value]) => {
    if (key in context) {
      context[key] = value;
    }
  });
};
