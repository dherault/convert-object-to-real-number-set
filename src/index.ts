/**
 * Converts an object to a real number set representation.
 * This is a proof of concept implementation.
 * 
 * Note: This function filters out NaN values and includes Infinity/-Infinity.
 */
export function convertObjectToRealNumberSet(obj: Record<string, unknown>): number[] {
  // For now, we'll extract numeric values from the object
  const numbers: number[] = [];
  
  for (const value of Object.values(obj)) {
    if (typeof value === 'number' && !isNaN(value)) {
      numbers.push(value);
    }
  }
  
  return numbers.sort((a, b) => a - b);
}

export default convertObjectToRealNumberSet;
