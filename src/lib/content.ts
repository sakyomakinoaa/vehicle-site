import { getCollection } from 'astro:content';

// 開発中(npm run dev)は確認前の記事も表示する。公開版(npm run build)は verified: true のみ。
export const showUnverified = import.meta.env.DEV;

export async function getNews() {
  const all = await getCollection('news', ({ data }) => showUnverified || data.verified);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getVehicles() {
  const all = await getCollection('vehicles', ({ data }) => showUnverified || data.verified);
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, 'ja'));
}

// トップページの「ピックアップ」用。featured: true が付いた記事を新着順で。
// 1件もなければ、新着順の上位からcountで指定した件数を使う(これまで通りの動き)。
export async function getPickupNews(count = 4) {
  const all = await getNews();
  const featured = all.filter((n) => n.data.featured);
  return (featured.length > 0 ? featured : all).slice(0, count);
}

export function formatDate(d: Date) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
