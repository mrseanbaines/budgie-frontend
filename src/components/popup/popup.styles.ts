import styled, { css } from 'styled-components'

export const Container = styled.div(({ theme }) => {
  return css`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 ${theme.space[3]};
    z-index: ${theme.zIndices.popup};
  `
})

export const Wrapper = styled.div(({ theme }) => {
  return css`
    background: ${theme.colors.background.default};
    padding: ${theme.space[6]} ${theme.space[4]};
    border-radius: ${theme.radii.rounded[1]};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 100%;
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

    > div {
      width: ${theme.sizes.icon[1]};
      height: ${theme.sizes.icon[1]};
    }
  `
})

export const Button = styled.button(({ theme }) => {
  return css`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;

    &,
    svg {
      display: block;
      width: auto;
      height: 100%;
    }
  `
})
