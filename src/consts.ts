export const SITE_TITLE = '站点标题';
export const SITE_DESCRIPTION = '一个关于开发与日常的私人博客';
export const AUTHOR = '你的名字';
export const AUTHOR_TAGLINE = '写代码，也写字';
export const AUTHOR_BIO =
  '一个开发者，记录写下的代码与走过的日子。这是我的私人博客——没有追踪器，没有广告，只有字与图。';
export const AUTHOR_AVATAR = 'https://picsum.photos/seed/author-portrait/400/500';
export const SITE_URL = 'https://username.github.io';

// Twikoo 评论配置：部署在 Netlify 时，envId 即为部署地址
export const TWIKOO_ENV_ID = 'https://twikoo-vipsbpig.netlify.app/';

export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '开发' },
  { href: '/life', label: '生活' },
  { href: '/tags', label: '标签' },
  { href: '/about', label: '关于' },
] as const;

// 分类：slug 是路由，collection 是对应的内容集合名（生活用 photos 集合）
export const CATEGORIES = [
  {
    slug: 'posts',
    label: '开发',
    description: '技术笔记、踩坑复盘、项目碎片——写给未来的自己看。',
    collection: 'posts' as const,
    color: 'var(--color-sage)',
  },
  {
    slug: 'life',
    label: '生活',
    description: '照片与短文，日子里的光与琐碎。',
    collection: 'photos' as const,
    color: 'var(--color-coral)',
  },
] as const;

// 精选文章：手工策划，type 对应集合，slug 对应文件名（无扩展名）
export const FEATURED = [
  { type: 'dev' as const, slug: 'blog-launch' },
  { type: 'photo' as const, slug: 'weekend-coffee' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/username',
  rss: '/rss.xml',
} as const;
