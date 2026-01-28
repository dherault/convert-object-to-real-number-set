import type { Pair, Rn, Unit } from './types'

export function encodeNRToR(n: number, r: number): number {
  return n + Math.atan(r) / Math.PI + 1 / 2
}

export function decodeRToNR(value: number): Pair {
  const n = Math.floor(value)
  const r = Math.tan(Math.PI * ((value - n) - 1 / 2))

  return { n, r }
}

export function encodeRn(rn: Rn): number[] {
  const set: number[] = []

  rn.forEach((r, i) => {
    set.push(encodeNRToR(i, r))
  })

  return set
}

export function decodeRn(set: number[]): Rn {
  const rn: Rn = [0, 0, 0]

  set.forEach(encodedValue => {
    const { n, r } = decodeRToNR(encodedValue)

    rn[n] = r
  })

  return rn
}

const KEY_N = 0
const VALUE_N = 1

export function encodeUnit(unit: Unit) {
  const set: number[] = []
  let cursor = 0

  unit.forEach((value, key) => {
    cursor++
    encodeRn(key).forEach(encodedKeyValue => {
      set.push(encodeNRToR(KEY_N, encodeNRToR(cursor, encodedKeyValue)))
    })
    encodeRn(value).forEach(encodedValueValue => {
      set.push(encodeNRToR(VALUE_N, encodeNRToR(cursor, encodedValueValue)))
    })
  })

  return set
}

export function decodeUnit(set: number[]): Unit {
  const unit: Unit = new Map()
  const keys: Record<number, number[]> = {}
  const values: Record<number, number[]> = {}

  set.forEach(encodedItem => {
    const typePair = decodeRToNR(encodedItem)

    if (typePair.n === KEY_N) {
      const cursorKeyPair = decodeRToNR(typePair.r)

      if (!keys[cursorKeyPair.n]) keys[cursorKeyPair.n] = []

      keys[cursorKeyPair.n].push(cursorKeyPair.r)
    }
    if (typePair.n === VALUE_N) {
      const cursorValuePair = decodeRToNR(typePair.r)

      if (!values[cursorValuePair.n]) values[cursorValuePair.n] = []

      values[cursorValuePair.n].push(cursorValuePair.r)
    }
  })

  Object.entries(keys).forEach(([cursorString, keyValues]) => {
    const valueValues = values[Number(cursorString)] ?? []

    unit.set(decodeRn(keyValues), decodeRn(valueValues))
  })

  return unit
}
