import { css } from 'styled-components'

import sfProTextMediumWoff2 from 'fonts/sf-pro-text-medium.woff2'
import sfProTextMediumWoff from 'fonts/sf-pro-text-medium.woff'
import theme, { fonts } from 'theme'

export const typefaces = [
  {
    fontFamily: fonts.primary,
    url: {
      woff2: sfProTextMediumWoff2,
      woff: sfProTextMediumWoff,
    },
    fontStyle: 'normal',
    fontWeight: theme.fontWeights.medium,
  },
]

export const fontfaces = typefaces.map(
  ({ fontFamily, url, fontStyle, fontWeight }) => css`
    @font-face {
      font-family: ${fontFamily};
      src: url(${url.woff2}) format('woff2'), url(${url.woff}) format('woff');
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      font-display: swap;
    }
  `,
)
