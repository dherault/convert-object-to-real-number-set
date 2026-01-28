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

  it('should handle negative numbers', () => {
    const input = { a: -5, b: 10, c: -2 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([-5, -2, 10]);
  });

  it('should handle floating point numbers', () => {
    const input = { a: 1.5, b: 2.3, c: 0.1 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([0.1, 1.5, 2.3]);
  });

  it('should filter out NaN values', () => {
    const input = { a: 1, b: NaN, c: 2 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([1, 2]);
  });

  it('should handle Infinity values', () => {
    const input = { a: 1, b: Infinity, c: -Infinity, d: 5 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toEqual([-Infinity, 1, 5, Infinity]);
  });

  it('should handle zero', () => {
    const input = { a: 0, b: -0, c: 1 };
    const result = convertObjectToRealNumberSet(input);
    expect(result).toHaveLength(3);
    expect(result[2]).toBe(1);
    // Both 0 and -0 are included, order depends on iteration
    expect(result[0] + 1).toBe(1); // Verifies it's some form of zero
    expect(result[1] + 1).toBe(1); // Verifies it's some form of zero
  });
});
