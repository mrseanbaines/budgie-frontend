import styled, { css } from 'styled-components'

export const Wrapper = styled.div(() => {
  return css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `
})

export const HeaderWrapper = styled.div(({ theme }) => {
  return css`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: ${theme.zIndices.header};
  `
})

export const UpperSection = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[3]} ${theme.space[4]};
    display: grid;
    gap: ${theme.space[3]};
    background: ${theme.colors.background.default};
  `
})

export const Total = styled.div(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[2]};
    justify-content: center;
    text-align: center;
  `
})

export const TotalLabel = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[1]};
    color: ${theme.colors.text.muted};
  `
})

export const TotalAmount = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[5]};
  `
})

export const ListHeadingWrapper = styled.div(({ theme }) => {
  return css`
    background: ${theme.colors.background.default};
    position: sticky;
    top: 0;
  `
})
