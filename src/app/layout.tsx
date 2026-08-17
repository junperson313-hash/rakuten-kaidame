import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rakuten-kaidame.vercel.app";
const title = "楽天 買いだめ判定｜今日は買う？待つ？日用品のお得度チェッカー";
const description =
  "楽天市場の日用品を、楽天イベント・価格・家族人数などから「今日買う」「待つ」に分かりやすく判定。洗剤・シャンプー・水・お米などの買いだめ判断をサポートします。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s｜楽天 買いだめ判定",
  },
  description,
  keywords: [
    "楽天 買いだめ",
    "楽天 日用品 おすすめ",
    "楽天 お買い物マラソン 日用品",
    "楽天 スーパーセール 日用品",
    "楽天 まとめ買い",
    "5と0のつく日 何買う",
    "楽天ポイントアップ 何買う",
    "日用品 買いだめ おすすめ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "楽天 買いだめ判定",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
