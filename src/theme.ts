export const fonts = {
  primary: 'SF Pro Text',
}

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  grey: ['#3E4149', '#B8B9BC', '#E6E8E8', '#F6F7F7'],
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
  },
  fonts: {
    primary: `'${fonts.primary}', 'Roboto', 'Helvetica Neue', sans-serif`,
  },
  fontSizes: [12, 14, 16, 18, 20, 22, 24],
  fontWeights: {
    medium: 500,
  },
  radii: {
    none: 0,
    rounded: [8, 32],
    circle: '9999em',
  },
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32],
}

export default theme
