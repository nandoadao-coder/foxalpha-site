# FoxAlpha — Site

Site oficial da FoxAlpha (`foxalpha.com.br`). Construído com Astro 5/6 + Cloudflare Pages.

## Stack

- **Framework:** Astro (SSG + ilhas React)
- **UI:** React 19 onde precisa, HTML estático no resto
- **Styling:** Tailwind CSS 4 + design tokens em `src/styles/tokens.css`
- **Conteúdo:** MDX no git, validado por schemas Zod (loader API do Astro)
- **Hospedagem:** Cloudflare Pages
- **Analytics:** Cloudflare Web Analytics (privacy-first)
- **Agent IA (sprint 1+):** Cloudflare Workers + Groq + Llama 4 Maverick

## Setup local

```bash
# Pré-requisitos: Node 20+
npm install
cp .env.example .env.local  # editar com seus valores
npm run dev
```

Acesse `http://localhost:4321`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev server com hot-reload |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm test` | Vitest |
| `npm run check` | Type check (Astro) |
| `npm run generate:og` | Regenera `public/og-default.png` |

## Deploy

Push para `main` → Cloudflare Pages builda e publica automaticamente em `foxalpha.com.br`.
PRs geram preview URLs únicos.

## Estrutura

```
src/
├── content/         # MDX (cases, posts, authors)
├── content.config.ts  # Schemas Zod + glob loaders
├── components/      # Astro components (UI, layout, home, seo)
├── layouts/         # BaseLayout, page layouts
├── pages/           # File-based routing
└── styles/          # Tokens + global CSS

public/              # Static assets (favicon, OG image, robots, cases/)
scripts/             # Build/maintenance scripts (gerar OG, etc.)
tests/               # Vitest tests
```

## Adicionar conteúdo

### Novo case

Criar `src/content/cases/<slug>.mdx` com frontmatter:

```yaml
---
title: "Título"
slug: "slug-url"
client: "Nome do cliente"
pitch: "Frase curta de resultado (até 160 chars)"
type: "saas"  # ou landing, institucional, filantropico
url: "https://..."
heroImage: "/cases/<arquivo>.png"
publishedAt: 2026-04-28
stack: ["Astro", "Cloudflare"]
metrics:
  - label: "Tickets reduzidos"
    value: "70%"
---

## Contexto
...
```

### Novo post

Criar `src/content/posts/<slug>.mdx`:

```yaml
---
title: "..."
slug: "..."
excerpt: "Resumo de 1-2 frases"
publishedAt: 2026-04-28
tags: [arquitetura, engenharia]
---
```

## Licença

MIT — veja `LICENSE`.

## Créditos

Construído pela FoxAlpha.
