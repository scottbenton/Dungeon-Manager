import type { Config } from 'tailwindcss';
import { withTV } from 'tailwind-variants/transformer';
import colors from 'tailwindcss/colors';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
      },
      fontFamily: {
        body: ['Inter Variable', ...fontFamily.sans],
        title: ['Playfair Display Variable', ...fontFamily.serif],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default withTV(config);
