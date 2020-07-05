import styled, { css } from 'styled-components'

export const UpperSection = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[3]} ${theme.space[4]};
    display: grid;
    gap: ${theme.space[3]};
    justify-items: center;
  `
})

export const Details = styled.p(({ theme }) => {
  return css`
    text-align: center;
    font-size: ${theme.fontSizes[1]};
  `
})

export const Meta = styled.p(({ theme }) => {
  return css`
    text-align: center;
    font-size: ${theme.fontSizes[1]};
    color: ${theme.colors.text.muted};
  `
})

export const Logo = styled.div(({ theme }) => {
  return css`
    color: ${theme.colors.icons.muted};
    width: ${theme.sizes.badge[2]};
    height: ${theme.sizes.badge[2]};
    margin: ${theme.space[4]};

    svg {
      width: 100%;
      height: 100%;
    }
  `
})
