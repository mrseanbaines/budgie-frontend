import { createGlobalStyle, css } from 'styled-components'
import 'modern-css-reset'

import { fontfaces } from './fonts'

const GlobalStyles = createGlobalStyle(({ theme }) => {
  return css`
    ${fontfaces};

    html,
    body {
      color: ${theme.colors.text.default};
      font-family: ${theme.fonts.primary};
      font-weight: ${theme.fontWeights.medium};
      line-height: calc(1em + 2px);
    }
  `
})

export default GlobalStyles
