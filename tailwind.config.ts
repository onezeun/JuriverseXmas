import type { Config } from 'tailwindcss';
import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s infinite ease-in-out',
        twinkle: 'twinkle 1.5s infinite ease-in-out',
        fall: 'fall linear infinite',
        bounce: 'bounce 2s infinite',
      },
      backgroundImage: {
        pattern: `linear-gradient(45deg, #e9ecef 25%, transparent 25%),
                   linear-gradient(-45deg, #e9ecef 25%, transparent 25%),
                   linear-gradient(45deg, transparent 75%, #e9ecef 75%),
                   linear-gradient(-45deg, transparent 75%, #e9ecef 75%)`,
      },
      colors: {
        'envelope': '#F8F1E7', // 크림색
        'flap': '#D4A373', // 고급스러운 갈색
        'christmas-red': '#C41E3A',
        'christmas-gold': '#F5DEB3',
        'gray_main': '#5F6368',
        'gray_50': '#F7F6F6',
        'gray_200': '#D1D1D1',
        'gray_100': '#F3F4F6',
        'gray_300': '#D1D5DB',
        'gray_500': '#6B7280',
      },
      screens: {
        csm: { min: '0px', max: '540px' }, // 모바일: 0px부터 540px까지
        cmd: { min: '541px', max: '1080px' }, // 중간 화면: 541px부터 1023px까지
        clg: { min: '1081px' }, // 데스크탑: 1024px 이상
      },
      backgroundSize: {
        pattern: '20px 20px',
      },
    },
  },
  plugins: [tailwindScrollbarHide],
} satisfies Config;
