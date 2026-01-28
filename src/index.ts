import type { Rn } from './types'

export function encodeNRToR(n: number, r: number): number {
  return n + Math.atan(r) / Math.PI + 1 / 2
}

export function decodeRToNR(value: number): { n: number, r: number } {
  const n = Math.floor(value)
  const r = Math.tan(Math.PI * ((value - n) - 1 / 2))

  return { n, r }
}

export function encodeRn(rn: Rn): number[] {
  const set: number[] = []
  const max = Math.max(...rn)

  rn.forEach((r, i) => {
    set.push(r, max + encodeNRToR(i, r))
  })

  return set
}
