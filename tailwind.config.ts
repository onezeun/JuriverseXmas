import type { Config } from 'tailwindcss';

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
      },
      backgroundImage: {
        pattern: `linear-gradient(45deg, #e9ecef 25%, transparent 25%),
                   linear-gradient(-45deg, #e9ecef 25%, transparent 25%),
                   linear-gradient(45deg, transparent 75%, #e9ecef 75%),
                   linear-gradient(-45deg, transparent 75%, #e9ecef 75%)`,
      },
      colors: {
        envelope: '#F8F1E7', // 크림색
        flap: '#D4A373', // 고급스러운 갈색
      },
      backgroundSize: {
        pattern: '20px 20px',
      },
    },
  },
  plugins: [],
} satisfies Config;
