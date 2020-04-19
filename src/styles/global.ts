import { createGlobalStyle } from 'styled-components'
import 'modern-css-reset'

import { fontfaces } from './fonts'

const GlobalStyles = createGlobalStyle`
    ${fontfaces};

    * {
        font-family: ${props => props.theme.fonts.primary};
        font-weight: ${props => props.theme.fontWeights.medium};
        line-height: calc(1em + 2px);
        color: ${props => props.theme.colors.text.default};
    }
`

export default GlobalStyles
