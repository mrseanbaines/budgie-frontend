import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[4]};
  `
})

export const TitleGroup = styled.div(({ theme }) => {
  return css`
    display: grid;
    color: ${theme.colors.text.default};
    gap: ${theme.space[2]};
    justify-content: center;
    text-align: center;
  `
})

export const Merchant = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[1]};
  `
})

export const Date = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[0]};
    color: ${theme.colors.text.muted};
  `
})

export const Amount = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[5]};
  `
})

interface ImageProps {
  src?: string | undefined
}

export const Image = styled.div<ImageProps>(({ theme, src }) => {
  return css`
    width: ${theme.sizes.badge[2]};
    height: ${theme.sizes.badge[2]};
    border-radius: ${theme.radii.circle};
    background: ${theme.colors.background.muted};
    margin: 0 auto;
    background-image: url(${src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `
})
