import * as Stitches from '@stitches/react';

const { createStitches } = Stitches;

const scale = {
  's-0:': '0px',
  's-px': '1px',
  's-0.5': '0.125rem' /* 2px" */,
  's-1': '0.25rem' /* 4px" */,
  's-1.5': '0.375rem' /* 6px" */,
  's-2': '0.5rem' /* 8px" */,
  's-2.5': '0.625rem' /* 10px" */,
  's-3': '0.75rem' /* 12px" */,
  's-3.5': '0.875rem' /* 14px" */,
  's-4': '1rem' /* 16px" */,
  's-5': '1.25rem' /* 20px" */,
  's-6': '1.5rem' /* 24px" */,
  's-7': '1.75rem' /* 28px" */,
  's-8': '2rem' /* 32px" */,
  's-9': '2.25rem' /* 36px" */,
  's-10': '2.5rem' /* 40px" */,
  's-11': '2.75rem' /* 44px" */,
  's-12': '3rem' /* 48px" */,
  's-14': '3.5rem' /* 56px" */,
  's-16': '4rem' /* 64px" */,
  's-20': '5rem' /* 80px" */,
  's-24': '6rem' /* 96px" */,
  's-28': '7rem' /* 112px" */,
  's-32': '8rem' /* 128px" */,
  's-36': '9rem' /* 144px" */,
  's-40': '10rem' /* 160px" */,
  's-44': '11rem' /* 176px" */,
  's-48': '12rem' /* 192px" */,
  's-52': '13rem' /* 208px" */,
  's-56': '14rem' /* 224px" */,
  's-60': '15rem' /* 240px" */,
  's-64': '16rem' /* 256px" */,
  's-72': '18rem' /* 288px" */,
  's-80': '20rem' /* 320px" */,
  's-96': '24rem' /* 384px" */,
  's-auto': 'auto',
  's-1/2': '50%',
  's-1/3': '33.333333%',
  's-2/3': '66.666667%',
  's-1/4': '25%',
  's-2/4': '50%',
  's-3/4': '75%',
  's-1/5': '20%',
  's-2/5': '40%',
  's-3/5': '60%',
  's-4/5': '80%',
  's-1/6': '16.666667%',
  's-2/6': '33.333333%',
  's-3/6': '50%',
  's-4/6': '66.666667%',
  's-5/6': '83.333333%',
  's-1/12': '8.333333%',
  's-2/12': '16.666667%',
  's-3/12': '25%',
  's-4/12': '33.333333%',
  's-5/12': '41.666667%',
  's-6/12': '50%',
  's-7/12': '58.333333%',
  's-8/12': '66.666667%',
  's-9/12': '75%',
  's-10/12': '83.333333%',
  's-11/12': '91.666667%',
  's-full': '100%',
  's-screen': '100vw',
  's-min': 'min-content',
  's-max': 'max-content',
  's-fit': 'fit-content',
};

export const { styled, css, createTheme, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      // Blue Gray
      'gray-50': '#f8fafc',
      'gray-100': '#f1f5f9',
      'gray-200': '#e2e8f0',
      'gray-300': '#cbd5e1',
      'gray-400': '#94a3b8',
      'gray-500': '#64748b',
      'gray-600': '#475569',
      'gray-700': '#334155',
      'gray-800': '#1e293b',
      'gray-900': '#0f172a',
      'surface-gray-transparent': '#00001add',
      'surface-gray-transparent-light': '#64748b60',
      'surface-background': '$gray-100',
      'surface-foreground': '$white',
      'border-neutral': '$gray-300',
      'text-gray-primary': '$gray-900',
      'text-gray-secondary': '$gray-700',
      'text-gray-tertiary': '$gray-500',
      // Brand Color
      'brand-50': '#f5f3ff',
      'brand-100': '#ede9fe',
      'brand-200': '#ddd6fe',
      'brand-300': '#c4b5fd',
      'brand-400': '#a78bfa',
      'brand-500': '#8b5cf6',
      'brand-600': '#7c3aed',
      'brand-700': '#6d28d9',
      'brand-800': '#5b21b6',
      'brand-900': '#4c1d95',
      'surface-brand': '$brand-200',
      'border-brand': '$brand-400',
      'text-brand-primary': '$brand-700',
      'text-brand-secondary': '$brand-600',
      'text-brand-tertiary': '$brand-500',
      // Info
      'info-50': '#f0f9ff',
      'info-100': '#e0f2fe',
      'info-200': '#bae6fd',
      'info-300': '#7dd3fc',
      'info-400': '#38bdf8',
      'info-500': '#0ea5e9',
      'info-600': '#0284c7',
      'info-700': '#0369a1',
      'info-800': '#075985',
      'info-900': '#0c4a6e',
      'surface-info': '$info-200',
      'border-info': '$info-400',
      'text-info-primary': '$info-700',
      'text-info-secondary': '$info-600',
      'text-info-tertiary': '$info-500',
      // Success
      'success-50': '#f0fdf4',
      'success-100': '#dcfce7',
      'success-200': '#bbf7d0',
      'success-300': '#86efac',
      'success-400': '#4ade80',
      'success-500': '#22c55e',
      'success-600': '#16a34a',
      'success-700': '#15803d',
      'success-800': '#166534',
      'success-900': '#14532d',
      'surface-success': '$success-200',
      'border-success': '$success-400',
      'text-success-primary': '$success-700',
      'text-success-secondary': '$success-600',
      'text-success-tertiary': '$success-500',
      // Warning
      'warning-50': '#fffbeb',
      'warning-100': '#fef3c7',
      'warning-200': '#fde68a',
      'warning-300': '#fcd34d',
      'warning-400': '#fbbf24',
      'warning-500': '#f59e0b',
      'warning-600': '#d97706',
      'warning-700': '#b45309',
      'warning-800': '#92400e',
      'warning-900': '#78350f',
      'surface-warning': '$warning-200',
      'border-warning': '$warning-400',
      'text-warning-primary': '$warning-700',
      'text-warning-secondary': '$warning-600',
      'text-warning-tertiary': '$warning-500',
      // Error
      'error-50': '#fef2f2',
      'error-100': '#fee2e2',
      'error-200': '#fecaca',
      'error-300': '#fca5a5',
      'error-400': '#f87171',
      'error-500': '#ef4444',
      'error-600': '#dc2626',
      'error-700': '#b91c1c',
      'error-800': '#991b1b',
      'error-900': '#7f1d1d',
      'surface-error': '$error-200',
      'border-error': '$error-400',
      'text-error-primary': '$error-700',
      'text-error-secondary': '$error-600',
      'text-error-tertiary': '$error-500',
    },
    space: {
      ...scale,
      auto: 'auto',
    },
    fontSizes: {
      'text-xs': '.75rem',
      'text-sm': '.875rem',
      'text-base': '1rem',
      'text-lg': '1.125rem',
      'text-xl': '1.25rem',
      'text-2xl': '1.5rem',
      'text-3xl': '1.875rem',
      'text-4xl': '2.25rem',
      'text-5xl': '3rem',
      'text-6xl': '3.75rem',
      'text-7xl': '4.5rem',
      'text-8xl': '6rem',
      'text-9xl': '8rem',
    },
    fonts: {
      title: 'Neucha, Georgia, Cambria, "Times New Roman", Times, serif',
      body: 'InterVariable, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    fontWeights: {
      thin: 100,
      extraLight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    lineHeights: {
      'leading-3': '.75rem' /* 12px */,
      'leading-4': '1rem' /* 16px */,
      'leading-5': '1.25rem' /* 20px */,
      'leading-6': '1.5rem' /* 24px */,
      'leading-7': '1.75rem' /* 28px */,
      'leading-8': '2rem' /* 32px */,
      'leading-9': '2.25rem' /* 36px */,
      'leading-10': '2.5rem' /* 40px */,
      'leading-none': 1,
      'leading-tight': 1.25,
      'leading-snug': 1.375,
      'leading-normal': 1.5,
      'leading-relaxed': 1.625,
      'leading-loose': 2,
    },
    letterSpacings: {
      'tracking-tighter': '-0.05em',
      'tracking-tight': '-0.025em',
      'tracking-normal': '0em',
      'tracking-wide': '0.025em',
      'tracking-wider': '0.05em',
      'tracking-widest': '0.1em',
    },
    sizes: {
      ...scale,
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      prose: '65ch',

      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
      'screen-2xl': '1536px',
    },
    borderWidths: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    borderStyles: {
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted',
      double: 'double',
      hidden: 'hidden',
      none: 'none',
    },
    radii: {
      base: '.25rem',
      md: '.375rem',
      lg: '.5rem',
      xl: '.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: '0 0 #0000',
    },
    zIndices: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      overlay: 500,
      menu: 800,
      modal: 1000,
      auto: 'auto',
    },
    transitions: {
      'transition-color':
        'color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow',
      'transition-opacity': 'opacity',
      'duration-150': '150ms',
      'ease-in-out': 'ease-in-out',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
  utils: {
    paddingY: (value: Stitches.ScaleValue<'space'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    paddingX: (value: Stitches.ScaleValue<'space'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    marginY: (value: Stitches.ScaleValue<'space'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    marginX: (value: Stitches.ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});

export const darkTheme = createTheme({
  colors: {
    // Blue Gray
    'surface-background': '$gray-900',
    'surface-foreground': '$gray-800',
    'border-neutral': '$gray-600',
    'text-gray-primary': '$white',
    'text-gray-secondary': '$gray-200',
    'text-gray-tertiary': '$gray-500',
    // Brand Color
    'surface-brand': '$brand-900',
    'border-brand': '$brand-700',
    'text-brand-primary': '$white',
    'text-brand-secondary': '$brand-200',
    'text-brand-tertiary': '$brand-400',
  },
});
