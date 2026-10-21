import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const photos = await getCollection('photos', ({ data }) => !data.draft);

  const items = [...posts, ...photos].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: items.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      description: item.data.summary,
      link:
        item.collection === 'posts'
          ? `/posts/${item.id}/`
          : `/photos/${item.id}/`,
    })),
  });
}
