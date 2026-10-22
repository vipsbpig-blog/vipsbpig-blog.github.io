export const SITE_TITLE = '黑猪的博客';
export const SITE_DESCRIPTION = '黑猪的私人博客——记录生活、思考与看过的故事。';
export const AUTHOR = '黑猪';
export const AUTHOR_TAGLINE = '看剧，也想事儿';
export const AUTHOR_BIO =
  '一头在城市里打滚的黑猪，偶尔写字，记录看过的故事和想过的事。这是我的私人博客——没有追踪器，没有广告，只有字。';
export const AUTHOR_AVATAR = 'https://picsum.photos/seed/black-pig-portrait/400/500';
export const SITE_URL = 'https://vipsbpig-blog.github.io';

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
    description: '看过的剧、想过的事、日子里的杂感。',
    collection: 'photos' as const,
    color: 'var(--color-coral)',
  },
] as const;

// 精选文章：手工策划，type 对应集合，slug 对应文件名（无扩展名）
export const FEATURED = [
  { type: 'photo' as const, slug: 'cyberpunk-edgerunners-1-vs-2' },
] as const;

// 文章卡片摘要：自动提取时的最大字符数（手填 summary 不受限）
export const EXCERPT_MAX_CHARS = 90;

export const SOCIAL_LINKS = {
  github: 'https://github.com/username',
  rss: '/rss.xml',
} as const;
