import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ニュース記事。verified が true のものだけが公開版に載る。
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    operator: z.string(),
    summary: z.string(),
    sourceName: z.string(),
    sourceUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
    // 関連する車両ページのID(src/content/vehicles/ のファイル名)
    vehicles: z.array(z.string()).default([]),
    verified: z.boolean().default(false),
  }),
});

// 車両ページ。
const vehicles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vehicles' }),
  schema: z.object({
    name: z.string(),
    operator: z.string(),
    kind: z.string().default('電車'),
    status: z.enum(['運行中', '導入予定', '引退予定', '引退済み']),
    lines: z.array(z.string()).default([]),
    summary: z.string(),
    verified: z.boolean().default(false),
  }),
});

export const collections = { news, vehicles };
