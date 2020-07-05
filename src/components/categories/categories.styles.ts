import styled, { css } from 'styled-components'

export const Wrapper = styled.div(() => {
  return css`
    height: 100vh;
    display: flex;
    flex-direction: column;
  `
})

export const UpperSection = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[3]} ${theme.space[4]};
    display: grid;
    gap: ${theme.space[3]};
  `
})

export const ScrollableArea = styled.div(() => {
  return css`
    flex: 1;
    overflow: auto;
  `
})

export const Body = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[3]} ${theme.space[4]};
    padding-top: 0;
  `
})
