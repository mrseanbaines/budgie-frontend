import { createGlobalStyle, css } from 'styled-components'
import 'modern-css-reset'

import { fontfaces } from './fonts'

const GlobalStyles = createGlobalStyle(({ theme }) => {
  return css`
    ${fontfaces};

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html,
    body {
      color: ${theme.colors.text.default};
      font-family: ${theme.fonts.primary};
      font-weight: ${theme.fontWeights.medium};
      line-height: calc(1em + 2px);
    }

    hr {
      border: none;
      border-top: ${theme.borders.default};
    }
  `
})

export default GlobalStyles
