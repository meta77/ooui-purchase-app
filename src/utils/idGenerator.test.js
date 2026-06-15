import { describe, it, expect } from 'vitest'
import { generateNextId } from './idGenerator'

describe('generateNextId', () => {
  it('generates correct next id without padding', () => {
    const existing = ['P-10001', 'P-10024']
    expect(generateNextId(existing, 'P-', 10001)).toBe('P-10025')
  })

  it('generates correct next id with padding', () => {
    const existing = ['PROD-001', 'PROD-004']
    expect(generateNextId(existing, 'PROD-', 1, 3)).toBe('PROD-005')
  })

  it('returns default id when no existing ids', () => {
    expect(generateNextId([], 'P-', 10001)).toBe('P-10001')
    expect(generateNextId([], 'PROD-', 1, 3)).toBe('PROD-001')
  })
})
