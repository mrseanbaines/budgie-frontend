export const fonts = {
  primary: 'SF Pro Text',
}

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  grey: ['#3E4149', '#B8B9BC', '#E6E8E8', '#F6F7F7'],
  categories: [
    '#DB5461',
    '#8EC6C5',
    '#F8DC88',
    '#FF6363',
    '#EFA8E4',
    '#B2EBF2',
    '#E7D39F',
    '#827397',
    '#FAE7CB',
    '#639A67',
    '#F19292',
    '#CBE2B0',
    '#F78259',
    '#FFBCBC',
    '#B7EFCD',
    '#FBC490',
    '#B590CA',
    '#D1CEBD',
  ],
}

const theme = {
  colors: {
    background: {
      default: colors.white,
      muted: colors.grey[3],
    },
    text: {
      default: colors.grey[0],
      muted: colors.grey[1],
    },
    icons: {
      default: colors.grey[0],
    },
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  fonts: {
    primary: `'${fonts.primary}', 'Roboto', 'Helvetica Neue', sans-serif`,
  },
  fontSizes: ['12px', '14px', '16px', '18px', '20px', '22px', '24px'],
  fontWeights: {
    medium: '500',
  },
  radii: {
    none: '0',
    rounded: ['8px', '32px'],
    circle: '9999em',
  },
  space: ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '28px', '32px'],
  sizes: {
    badge: ['28px', '40px', '80px'],
    icon: ['20px', '28px'],
  },
  borders: {
    default: `1px solid ${colors.grey[2]}`,
  },
  zIndices: {
    overlay: 1,
    popup: 2,
  },
}

export default theme
