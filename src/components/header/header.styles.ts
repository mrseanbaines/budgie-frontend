import styled, { css } from 'styled-components'

export const Wrapper = styled.nav(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.space[3]} ${theme.space[4]};

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

export const Button = styled.button(() => {
  return css`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  `
})
