import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const tagSlug = (tag: string): string =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const tagHref = (tag: string): string => `/tags/${tagSlug(tag)}/`;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Main posts only — excludes mini explainer blogs. Used by homepage, tag pages.
export async function getMainPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft && !data.mini);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllTags(
  { includeMini = false }: { includeMini?: boolean } = {},
): Promise<Map<string, Post[]>> {
  const posts = includeMini ? await getPublishedPosts() : await getMainPosts();
  const map = new Map<string, Post[]>();

  for (const post of posts) {
    for (const raw of post.data.tags ?? []) {
      const slug = tagSlug(raw);
      if (!slug) continue;
      const list = map.get(slug) ?? [];
      list.push(post);
      map.set(slug, list);
    }
  }
  return map;
}

export function originalTagName(slug: string, posts: Post[]): string {
  for (const p of posts) {
    for (const tag of p.data.tags ?? []) {
      if (tagSlug(tag) === slug) return tag;
    }
  }
  return slug;
}
