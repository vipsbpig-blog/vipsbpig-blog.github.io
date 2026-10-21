const PALETTE = [
  '#e07856', // coral
  '#6ba292', // sage
  '#e0a96d', // honey
  '#9d6b8b', // plum
  '#6b8a9e', // slate
] as const;

/**
 * 按 tag 名稳定地取一个柔和色。
 * 同一个 tag 永远返回同一个颜色，不同 tag 尽量分散。
 */
export function tagColor(tag: string): string {
  let h = 0;
  for (let i = 0; i < tag.length; i++) {
    h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return PALETTE[h % PALETTE.length];
}
