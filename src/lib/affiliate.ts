// 楽天アフィリエイトIDをここで一元管理する。
// 環境変数 NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID を設定するだけで、
// サイト内の全商品リンクが自動的にアフィリエイトリンクになる。
// 商品ごとにリンクを個別発行する必要はない(楽天の「リンク自動作成」と同じ仕組み)。
// 例: 1a2b3c4d.5e6f7g8h
// 未設定の間は通常の検索結果リンク(プレースホルダー)のまま動作する。

const RAKUTEN_AFFILIATE_ID = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID;

export function buildRakutenAffiliateUrl(keyword: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
  if (!RAKUTEN_AFFILIATE_ID) return searchUrl;
  // 楽天アフィリエイトのリンク変換(hb.afl.rakuten.co.jp)経由に切り替える
  const params = new URLSearchParams({ pc: searchUrl, link_type: "hybrid_url" });
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?${params.toString()}`;
}
