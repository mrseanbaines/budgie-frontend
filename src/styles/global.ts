import { createGlobalStyle } from 'styled-components'
import 'modern-css-reset'

import { fontfaces } from './fonts'

const GlobalStyles = createGlobalStyle`
    ${fontfaces};

    html,
    body {
        font-family: ${(props) => props.theme.fonts.primary};
        color: ${(props) => props.theme.colors.text.default};
    }
`

export default GlobalStyles
