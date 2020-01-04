import nightOwl from '@theme-ui/prism/presets/night-owl.json';
import { transparentize } from 'polished';

const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
];

const colors = {
  blue: [
    '#E2F2FD',
    '#ADDAFB',
    '#86C9F9',
    '#3FA9F5',
    '#0B7BCC',
    '#005593',
    '#042C49',
  ],
  gray: [
    '#F2F1F4',
    '#E4E3E8',
    '#BCB8C6',
    '#938EA4',
    '#6D667F',
    '#484455',
    '#232129',
  ],
  magenta: [
    '#F9E7F3',
    '#F3D3E9',
    '#E8A6D2',
    '#D459AB',
    '#8E256B',
    '#51153D',
    '#280B1F',
  ],
  purple: [
    '#F2ECF9',
    '#DCCDEE',
    '#C4ABE3',
    '#9F75D1',
    '#723CB4',
    '#542C85',
    '#30194D',
  ],
  yellow: [
    '#FFF9DB',
    '#FFF3B3',
    '#FFEC8A',
    '#FFDF37',
    '#CCAB00',
    '#665600',
    '#332B00',
  ],
  teal: [
    '#CCFFFC',
    '#A6FFFA',
    '#52FFF5',
    '#00E5D8',
    '#007A73',
    '#003835',
    '#001A18',
  ],
  orange: '#fb8400',
  pink: '#ffe6f6',
};

export default {
  initialColorMode: 'light',
  useCustomProperties: false,
  breakpoints: ['600px', '800px'],
  colors: {
    ...colors,
    background: 'white',
    primary: colors.magenta[3],
    secondary: colors.purple[2],
    accent: colors.yellow[3],
    muted: colors.blue[4],
    text: colors.gray[5],
    textLight: colors.gray[4],
    heading: colors.purple[6],
    link: colors.purple[5],
    modes: {
      dark: {
        ...colors,
        background: colors.blue[6],
        primary: colors.magenta[3],
        secondary: colors.purple[5],
        accent: colors.yellow[3],
        muted: colors.teal[1],
        text: colors.blue[0],
        textLight: colors.blue[1],
        link: colors.yellow[3],
        heading: 'white',
      },
    },
  },
  fonts: {
    body: defaultFontStack.join(),
    heading: defaultFontStack.join(),
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
  lineHeights: {
    body: 1.45,
    heading: 1.1,
  },
  radii: [0, 2, 5, 10],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  styles: {
    h1: {
      color: 'heading',
      fontSize: 4,
      lineHeight: 'heading',
      m: 0,
      mt: 4,
      '&:first-of-type': {
        mt: 0,
      },
      '@media (min-width: 750px)': {
        fontSize: 6,
      },
    },
    h2: {
      color: 'heading',
      fontSize: 5,
      lineHeight: 'heading',
      m: 0,
      mt: 4,
      '&:first-of-type': {
        mt: 0,
      },
    },
    h3: {
      color: 'heading',
      fontSize: 4,
      lineHeight: 'heading',
      m: 0,
      mt: 4,
      '&:first-of-type': {
        mt: 0,
      },
    },
    h4: {
      color: 'heading',
      lineHeight: 'heading',
      fontSize: 3,
      m: 0,
      mt: 4,
      '&:first-of-type': {
        mt: 0,
      },
    },
    h5: {
      color: 'heading',
      lineHeight: 'heading',
      m: 0,
      mt: 4,
      '&:first-of-type': {
        mt: 0,
      },
    },
    h6: {
      color: 'heading',
      lineHeight: 'heading',
      m: 0,
      mt: 4,
      '&:first-of-type': {
        mt: 0,
      },
    },
    pre: {
      fontSize: 1,
      overflowX: 'scroll',
      mx: '-5vw',
      p: 3,
      '@media (min-width: calc(54ch + 10vw))': {
        borderRadius: 2,
      },
    },
    code: {
      ...nightOwl,
    },
  },

  button: {
    // specificity haaaaaaaack
    '&&': { color: 'heading' },
    bg: 'primary',
    borderRadius: 6,
    display: 'inline-block',
    fontSize: 2,
    fontWeight: 'bold',
    mb: 4,
    mt: 2,
    py: 3,
    px: 4,
    textDecoration: 'none',
    textTransform: 'uppercase',
  },

  // namespace variants under the theme name
  'video-blog': {
    layout: {
      root: {
        color: 'text',
        lineHeight: 'body',
        'h1,h2,h3,h4,h5,h6': {
          lineHeight: 'heading',
        },
        table: {
          tableLayout: 'fixed',
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid',
          borderColor: 'primary',
        },
        th: {
          backgroundColor: 'text',
          color: 'background',
        },
        'th, td': {
          border: '1px solid',
          borderColor: 'text',
          p: 3,
        },
        'tbody tr': {
          '&:nth-of-type(even)': {
            background: t => transparentize(0.75, t.colors.primary),
          },
        },
        code: {
          fontSize: 2,
        },
        a: {
          color: 'link',
        },
      },
    },
    header: {
      link: {
        bg: 'primary',
        color: 'white',
        display: 'block',
        fontSize: [1, 2],
        fontWeight: 'bold',
        letterSpacing: 'caps',
        mx: 2,
        my: 1,
        p: 2,
        textDecoration: 'none',
        textTransform: 'uppercase',
        ':active, :focus, :hover': {
          bg: 'yellow.3',
          color: 'gray.6',
        },
      },
    },
  },
};
