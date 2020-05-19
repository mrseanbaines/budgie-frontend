import styled, { css } from 'styled-components'

export const Wrapper = styled.header(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    align-items: center;
    padding: ${theme.space[3]} ${theme.space[4]};
    display: grid;
    grid-template-columns: 1fr auto 1fr;

    *:nth-child(2) {
      justify-self: center;
    }

    *:nth-child(3) {
      justify-self: end;
    }
  `
})

export const CenterSection = styled.div(() => {
  return css`
    margin: 0 auto;
  `
})

const Text = styled.p(() => {
  return css`
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

export const Button = styled.button(({ theme }) => {
  return css`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;

    svg {
      display: block;
      width: auto;
      height: ${theme.sizes.icon[0]};
    }
  `
})
