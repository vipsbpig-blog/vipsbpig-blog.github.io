/**
 * 从 Markdown/MDX 正文提取首个纯文本段落作为摘要。
 * 用于 frontmatter 缺省 summary 时的兜底。
 */
export function getExcerpt(body: string, max = 90): string {
  if (!body) return '';

  let s = body;
  // 1. 删代码围栏（含语言标注），整块移除
  s = s.replace(/```[\s\S]*?```/g, '');
  // 2. 删图片 ![alt](url)
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  // 3. 删 JSX 组件（自闭合 + 成对），best-effort
  s = s.replace(/<[A-Z][\w-]*[^>]*\/>/g, '');
  s = s.replace(/<[A-Z][\w-]*[^>]*>[\s\S]*?<\/[A-Z][\w-]*>/g, '');
  // 4. 删行内代码 `code`
  s = s.replace(/`[^`]+`/g, '');
  // 5. 链接保留文字 [text](url) → text
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  // 6. 整行删标题（# 开头）
  s = s.replace(/^#{1,6}\s.*$/gm, '');
  // 7. 去强调/删除线标记，保留文字
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
  s = s.replace(/__([^_]+)__/g, '$1');
  s = s.replace(/\*([^*]+)\*/g, '$1');
  s = s.replace(/_([^_]+)_/g, '$1');
  s = s.replace(/~~([^~]+)~~/g, '$1');
  // 8. 去 blockquote 前缀 >，保留文字
  s = s.replace(/^>\s?/gm, '');
  // 9. 删 HTML 注释
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  // 10. 删剩余 HTML 标签（小写，如 <br>、<sub>）
  s = s.replace(/<\/?[a-z][\w-]*[^>]*>/g, '');

  // 11. 切段，取首个非空段落
  const paras = s.split(/\n{2,}/);
  for (const p of paras) {
    const t = p.replace(/\s+/g, ' ').trim();
    if (t.length > 0) {
      return t.length > max ? t.slice(0, max) + '…' : t;
    }
  }
  return '';
}
