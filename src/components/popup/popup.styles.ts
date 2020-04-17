import styled, { css } from 'styled-components'

export const Wrapper = styled.nav(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    padding: ${theme.space[6]} ${theme.space[4]};
    border-radius: ${theme.radii.rounded[1]};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 100%;

    position: fixed;
    bottom: 0;
  `
})

export const Title = styled.p(({ theme }) => {
  return css`
    color: ${theme.colors.text.default};
    font-weight: ${theme.fontWeights.medium};
    font-size: ${theme.fontSizes[2]};
    line-height: 1;
    text-align: center;
  `
})

export const Controls = styled.div(({ theme }) => {
  return css`
    justify-content: space-between;

    &,
    > * {
      display: flex;
      align-items: center;
    }

    svg {
      display: block;
      width: auto;
      height: ${theme.sizes.icon[1]};
    }
  `
})

export const Button = styled.button(() => {
  return css`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  `
})
