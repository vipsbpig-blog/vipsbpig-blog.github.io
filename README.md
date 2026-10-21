# vipsbpig-blog

基于 [Astro](https://astro.build) 的个人博客——开发记录与日常图文。

## 环境要求

- Node.js `>= 22.22.0`（见 `package.json:5`）
- npm（项目用 `package-lock.json`）

## 安装依赖

```sh
npm install
```

## 本地调试

Astro 7 内置后台 dev server 管理，不用单独开终端窗口。本项目统一用 `npm run astro --` 转发子命令。

```sh
npm run astro -- dev --background   # 后台启动 dev server（默认 http://localhost:4321）
npm run astro -- dev status         # 查看是否在运行
npm run astro -- dev logs --follow  # 实时看日志（Ctrl+C 退出跟踪，不停服务）
npm run astro -- dev stop           # 停止后台 dev server
```

> **为什么不能直接敲 `astro`？**
> `astro` 是项目本地依赖，装在 `node_modules/.bin/`，不在 shell 的 PATH 上。
> `npm run astro -- <子命令>` 会让 npm 临时把 `node_modules/.bin` 加进 PATH 再执行，
> 所以能直接写 `dev --background` 等子命令。这也是 `package.json` 推荐用 `npm run` 而非裸命令的原因。

- 想前台运行（终端被占用、Ctrl+C 退出）：`npm run dev`
- 想自动开浏览器：`npm run astro -- dev --background --open`
- 忘了 `--` 透传参数会失效，例如 `npm run astro dev stop`（缺 `--`）会报错。

## 写博客内容

内容用 [Content Collections](https://docs.astro.build/en/guides/content-collections/) 管理，schema 定义在 `src/content.config.ts`。两个集合：

### 开发记录（posts）

放在 `src/content/posts/*.md` 或 `*.mdx`。Frontmatter 字段：

| 字段 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | string | 是 | 标题 |
| `date` | date | 是 | 发布日期，如 `2026-10-21` |
| `summary` | string | 否 | 摘要，不填则自动提取正文前 90 字（`consts.ts:46`） |
| `tags` | string[] | 否 | 标签，默认 `[]`，自动生成 `/tags/<标签>` 页面 |
| `cover` | string | 否 | 封面图 URL |
| `draft` | boolean | 否 | `true` 时仅 dev 可见，生产构建会跳过 |

示例 `src/content/posts/my-post.mdx`：

```mdx
---
title: '我的新文章'
date: 2026-10-21
summary: '一篇关于某某的笔记。'
tags: ['astro', '笔记']
cover: 'https://picsum.photos/seed/my-post/1200/630'
---

正文从这里开始。MDX 支持组件语法。

## 小标题

内容……
```

### 日常图文（photos）

放在 `src/content/photos/*.md(x)`。与 posts 类似，但 `cover` **必填**，额外支持 `photos` 画谑数组：

| 字段 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | string | 是 | 标题 |
| `date` | date | 是 | 发布日期 |
| `summary` | string | 否 | 摘要 |
| `tags` | string[] | 否 | 标签 |
| `cover` | string | **是** | 封面图 URL |
| `photos` | string[] | 否 | 画谑多图 URL 数组，默认 `[]` |
| `draft` | boolean | 否 | 草稿标记 |

完整示例见 `src/content/photos/weekend-coffee.mdx`。

### 草稿与发布

- 新建文章加 `draft: true`，dev server 能看到，`npm run build` 不会输出到生产。
- 发布只需删掉 `draft` 行（或改为 `false`），然后提交推送（见「部署」）。

## 个性化配置

编辑 `src/consts.ts`：

- `SITE_TITLE` / `SITE_DESCRIPTION` / `AUTHOR` / `AUTHOR_BIO` / `AUTHOR_AVATAR`：站点与作者信息
- `SITE_URL`：**部署前必改**，需与 `astro.config.mjs` 的 `site` 一致
- `TWIKOO_ENV_ID`：评论服务地址（不要评论可置空）
- `NAV_LINKS`：导航栏
- `FEATURED`：首页精选文章，`type: 'dev'` 对应 posts、`'photo'` 对应 photos，`slug` 是文件名（不含扩展名）
- `SOCIAL_LINKS`：底部社交链接

## 构建与预览

```sh
npm run build             # 生产构建，输出到 ./dist
npm run preview           # 本地预览构建结果（先 build 再 preview）
npm run astro -- check    # TypeScript / 模板诊断检查
```

## 部署到 GitHub Pages

用 GitHub Actions 自动部署：推送到 `main` 即触发。Workflow 在 `.github/workflows/deploy.yml`。

### 一次性配置

1. **改两处 URL**（部署前必做）：
   - `astro.config.mjs:9`：`site: 'https://<你的用户名>.github.io'`
   - `src/consts.ts:8`：`SITE_URL = 'https://<你的用户名>.github.io'`
   - 若是项目站点（`https://<用户名>.github.io/<仓库名>`），还要在 `astro.config.mjs` 加 `base: '/<仓库名>/'`。

2. **开启 GitHub Pages**：仓库 **Settings → Pages → Source** 选 **GitHub Actions**。

3. **关联远程**（若未关联）：
   ```sh
   git remote add origin git@github.com:<你的用户名>/<仓库名>.git
   ```

### 发布

```sh
git add .
git commit -m "发布博客"
git push origin main
```

推送后到仓库 **Actions** 标签页看进度，绿色对勾即上线。

## 常用 Astro CLI 命令

| 命令 | 作用 |
| :--- | :--- |
| `npm run astro -- --help` | 查看所有 CLI 命令 |
| `npm run astro -- check` | TypeScript / 诊断检查 |
| `npm run astro -- add <集成名>` | 添加集成（如 `react`） |
| `npm run build` | 构建到 `./dist` |
| `npm run preview` | 预览构建结果 |

## 项目结构

```
/
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── public/                        # 静态资源（favicon 等）
├── src/
│   ├── components/                # Header / Footer / PostCard / TableOfContents / Twikoo 等
│   ├── content/
│   │   ├── posts/                 # 开发记录（md/mdx）
│   │   └── photos/                # 日常图文（md/mdx）
│   ├── content.config.ts          # 内容集合 schema
│   ├── consts.ts                  # 站点 / 作者 / 导航 / 精选 等配置
│   ├── layouts/                   # BaseLayout / PostLayout / PhotoLayout
│   ├── pages/                     # 路由：/ /posts /life /tags /about /rss.xml
│   ├── styles/                    # 全局样式
│   └── utils/                     # 工具函数
├── astro.config.mjs               # Astro 配置（site / mdx / sitemap / tailwind）
└── package.json
```

完整文档：https://docs.astro.build
