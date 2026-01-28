import { describe, it, expect } from '@jest/globals';
import { convertObjectToRealNumberSet } from './index';

describe('convertObjectToRealNumberSet', () => {
  it('should extract numeric values from an object', () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should sort numeric values in ascending order', () => {
    const input = { a: 3, b: 1, c: 2 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should ignore non-numeric values', () => {
    const input = { a: 1, b: 'string', c: 2, d: true, e: null };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([1, 2]);
  });

  it('should return empty array for object with no numeric values', () => {
    const input = { a: 'string', b: true, c: null };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([]);
  });

  it('should return empty array for empty object', () => {
    const input = {};
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([]);
  });
});
