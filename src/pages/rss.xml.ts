import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { cleanTitle } from '../lib/title';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('posts', ({ data }) => !data.draft && !data.mini)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Akshan — Writing',
    description: 'Notes and essays on machine learning, data, and the field of artificial intelligence in general.',
    site: context.site!,
    items: posts.map((post) => ({
      title: cleanTitle(post.data.title),
      pubDate: post.data.date,
      description: post.data.description ?? '',
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
