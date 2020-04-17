import styled, { css } from 'styled-components'

export const Overlay = styled.div(({ theme }) => {
  return css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.overlay};
    z-index: ${theme.zIndices.overlay};
  `
})
