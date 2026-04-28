import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

// Replicamos o schema localmente para testar a forma do schema
// (importar de astro:content so funciona em runtime Astro)
const caseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  client: z.string(),
  pitch: z.string().max(160),
  type: z.enum(['saas', 'landing', 'institucional', 'filantropico']),
  url: z.string().url().optional(),
  heroImage: z.string(),
  publishedAt: z.date(),
  featured: z.boolean().default(false),
  stack: z.array(z.string()).default([]),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).default([]),
});

describe('Case schema', () => {
  it('aceita case com campos minimos', () => {
    const valid = {
      title: 'Test Case',
      slug: 'test',
      client: 'Cliente',
      pitch: 'Pitch curto',
      type: 'saas' as const,
      heroImage: '/img.png',
      publishedAt: new Date('2026-01-01'),
    };
    expect(() => caseSchema.parse(valid)).not.toThrow();
  });

  it('rejeita pitch maior que 160 caracteres', () => {
    const invalid = {
      title: 'Test',
      slug: 'test',
      client: 'Cliente',
      pitch: 'a'.repeat(161),
      type: 'saas' as const,
      heroImage: '/img.png',
      publishedAt: new Date(),
    };
    expect(() => caseSchema.parse(invalid)).toThrow();
  });

  it('rejeita type invalido', () => {
    const invalid = {
      title: 'Test',
      slug: 'test',
      client: 'Cliente',
      pitch: 'Curto',
      type: 'foo',
      heroImage: '/img.png',
      publishedAt: new Date(),
    };
    expect(() => caseSchema.parse(invalid)).toThrow();
  });

  it('aceita url valida e rejeita invalida', () => {
    const validBase = {
      title: 'Test',
      slug: 'test',
      client: 'Cliente',
      pitch: 'Curto',
      type: 'saas' as const,
      heroImage: '/img.png',
      publishedAt: new Date(),
    };
    expect(() => caseSchema.parse({ ...validBase, url: 'https://example.com' })).not.toThrow();
    expect(() => caseSchema.parse({ ...validBase, url: 'not-a-url' })).toThrow();
  });
});
