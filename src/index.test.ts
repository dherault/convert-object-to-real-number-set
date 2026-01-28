import { describe, expect, it } from '@jest/globals'

import type { Rn, Unit } from './types'

import { decodeRToNR, decodeRn, decodeUnit, encodeNRToR, encodeRn, encodeUnit } from './index'

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

      expect(decoded.n).toBe(n)
      expect(decoded.r).toBeCloseTo(r as number, 3)
    })
  })
})

describe('encodeRn and decodeRn', () => {
  const a: Rn = [0, 0, 0]
  const b: Rn = [Math.PI, -1, 0.5]
  const c: Rn = [1, 10, 100, 1000, 10000]

  function testDecodes(rn: Rn) {
    const decodedRn = decodeRn(encodeRn(rn))

    rn.forEach((r, i) => {
      expect(decodedRn[i]).toBeCloseTo(r, 3)
    })
  }

  it('encodes', () => {
    expect(Array.isArray(encodeRn(a))).toBe(true)
    expect(typeof encodeRn(b)[0]).toBe('number')
    expect(encodeRn(a)).not.toStrictEqual(encodeRn(b))
  })

  it('decodes', () => {
    testDecodes(a)
    testDecodes(b)
    testDecodes(c)
  })
})

describe('encodeUnit and decodeUnit', () => {
  const a: Unit = new Map<Rn, Rn>([
    [
      [0, 0.5, 1],
      [1, 10, 100],
    ],
    [
      [Math.PI, -1, 0.5],
      [-Math.PI, 0.5, -0.5],
    ],
  ])
  const b: Unit = new Map<Rn, Rn>([
    [
      [111, 2, 3, 4, 5],
      [5.1, 4.1, 3.1, 2.1, 1.1],
    ],
    [
      [100.333, 200.333, 300.333, 400.333, 500.333],
      [500.5, 400.5, 300.5, 200.5, 100.5],
    ],
  ])
  const c: Unit = new Map<Rn, Rn>([
    [
      [0.1, 0.2, 0.3],
      [2, 3, 4],
    ],
  ])

  function testDecodes(unit: Unit) {
    const decodedUnit = decodeUnit(encodeUnit(unit))

    expect(decodedUnit.size).toBe(unit.size)

    const entries = Array.from(unit.entries())
    const decodedEntries = Array.from(decodedUnit.entries())

    entries.forEach(([key, value], index) => {
      const [decodedKey, decodedValue] = decodedEntries[index]

      key.forEach((r, i) => {
        expect(decodedKey[i]).toBeCloseTo(r, 3)
      })

      value.forEach((r, i) => {
        expect(decodedValue[i]).toBeCloseTo(r, 3)
      })
    })
  }

  it('encodes', () => {
    expect(Array.isArray(encodeUnit(a))).toBe(true)
    expect(typeof encodeUnit(a)[0]).toBe('number')
    expect(encodeUnit(a)).not.toStrictEqual(encodeUnit(b))
  })

  it('decodes', () => {
    testDecodes(a)
    testDecodes(b)
    testDecodes(c)
  })
})
