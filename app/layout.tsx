import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "3초 카드뉴스 제조기 | Before & After 인스타 카드 만들기",
  description: "로그인 없이 무료로! 사진만 올리면 Before & After 카드뉴스가 완성됩니다. 인스타그램, SNS용 고화질 1080px 이미지를 바로 다운로드하세요.",
  keywords: "카드뉴스, 인스타그램, 카드뉴스 만들기, Before After, SNS 카드, 이미지 편집, 무료 카드뉴스",
  openGraph: {
    title: "3초 카드뉴스 제조기 | Before & After 인스타 카드",
    description: "로그인 없이 무료! 사진만 올리면 카드뉴스 완성",
    url: "https://card.ryohi5.com",
    siteName: "3초 카드뉴스 제조기",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://card.ryohi5.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2627121549841957" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2627121549841957"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
