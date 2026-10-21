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
  { href: '/archive', label: '归档' },
  { href: '/tags', label: '标签' },
  { href: '/about', label: '关于' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/username',
  rss: '/rss.xml',
} as const;
