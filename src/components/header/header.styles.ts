import styled, { css } from 'styled-components'

export const Wrapper = styled.nav(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      display: block;
      width: auto;
      height: ${theme.sizes.icon[0]};
    }
  `
})

const Text = styled.p(({ theme }) => {
  return css`
    color: ${theme.colors.text.default};
    font-weight: ${theme.fontWeights.medium};
    text-align: center;
    line-height: 1;
  `
})

export const Title = styled(Text).attrs({ as: 'h1' })(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[2]};
  `
})

export const Subtitle = styled(Text).attrs({ as: 'h2' })(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[0]};
    margin-top: ${theme.space[1]};
  `
})

export const Button = styled.button(({ theme }) => {
  return css`
    border: none;
    background: none;
    cursor: pointer;
    padding: ${theme.space[4]};
  `
})
