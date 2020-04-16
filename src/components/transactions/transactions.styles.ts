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

export const Search = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[3]} ${theme.space[4]};
  `
})

export const ListHeadingWrapper = styled.div(({ theme }) => {
  return css`
    background: ${theme.colors.background.default};
    position: sticky;
    top: 0;
  `
})
