import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    client: z.string(),
    pitch: z.string().max(160),
    type: z.enum(['saas', 'landing', 'institucional', 'filantropico']),
    url: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    heroImage: z.string(),
    publishedAt: z.date(),
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).default([]),
    gallery: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().max(200),
    publishedAt: z.date(),
    tags: z.array(z.enum(['arquitetura', 'casos-reais', 'mercado', 'engenharia', 'agents'])).default([]),
    author: z.string().default('fernando'),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    photo: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
});

export const collections = { cases, posts, authors };
