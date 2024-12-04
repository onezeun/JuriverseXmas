import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '주리의 크리스마스 파티 🎄',
  description:
    '주리 공주님의 크리스마스 파티에 초대합니다! 따뜻한 음악으로 가득한 마법 같은 크리스마스를 경험하세요. 🎅✨',

  openGraph: {
    title: '주리의 크리스마스 파티 🎄',
    description:
      '주리 공주님의 크리스마스 파티에 초대합니다! 따뜻한 음악으로 가득한 마법 같은 크리스마스를 경험하세요. 🎅✨',
    url: 'https://juri-xmas.vercel.app',
    siteName: '주리의 크리스마스 파티',
    images: [
      {
        url: '/images/og_img.png',
        width: 1200,
        height: 630,
        alt: '주리 크리스마스 파티 배너 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '주리의 크리스마스 파티 🎄',
    description:
      '주리 공주님의 크리스마스 파티에 초대합니다! 따뜻한 음악으로 가득한 마법 같은 크리스마스를 경험하세요. 🎅✨',
    images: ['/images/og_img.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
