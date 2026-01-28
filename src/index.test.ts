import { describe, expect, it } from '@jest/globals'

import { decodeRToNR, encodeNRToR } from './index'

describe('encodeNRToR and decodeNRtoR', () => {
  it('encodes', () => {
    expect(typeof encodeNRToR(0, 0)).toBe('number')
    expect(encodeNRToR(0, 0)).toBe(encodeNRToR(0, 0))
    expect(encodeNRToR(0, 0)).not.toBe(encodeNRToR(1, 0))
    expect(encodeNRToR(0, 0.5)).not.toBe(encodeNRToR(0, 0))
    expect(encodeNRToR(1, 0.5)).not.toBe(encodeNRToR(1, 0))
  })

  it('decodes', () => {
    ;[
      [0, 0],
      [1, 0],
      [2, 1],
      [3, -1],
      [10, 0.5],
      [11, -0.5],
      [123456, Math.PI],
      [123457, -Math.PI],
    ].forEach(([n, r]) => {
      const encoded = encodeNRToR(n, r)
      const decoded = decodeRToNR(encoded)
      // console.log(n, r, encoded, decoded)

      expect(decoded.n).toBe(n)
      expect(decoded.r).toBeCloseTo(r as number, 3)
    })
  })
})
