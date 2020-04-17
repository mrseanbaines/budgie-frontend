import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `
})

export const ScrollableArea = styled.div(({ theme }) => {
  return css`
    flex: 1;
    overflow: auto;
  `
})

export const Body = styled.div(({ theme }) => {
  return css`
    padding-bottom: ${theme.space[3]};
  `
})

export const Header = styled.div(({ theme }) => {
  return css`
    background: ${theme.colors.background.default};
  `
})

export const ListHeadingWrapper = styled.div(({ theme }) => {
  return css`
    background: ${theme.colors.background.default};
    position: sticky;
    top: 0;
  `
})

export const UpperSection = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[3]} ${theme.space[4]};
    display: grid;
    gap: ${theme.space[3]};
  `
})

export const Total = styled.div(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
})

export const TotalLabel = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[1]};
    line-height: 1;
    color: ${theme.colors.text.muted};
  `
})

export const TotalAmount = styled.span(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[5]};
    line-height: 1;
    color: ${theme.colors.text.default};
    margin-top: ${theme.space[1]};
  `
})