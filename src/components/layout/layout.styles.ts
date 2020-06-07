import styled, { css } from 'styled-components'

export const ScrollableArea = styled.div(() => {
  return css`
    flex: 1;
    overflow: auto;
  `
})

export const Body = styled.div(({ theme }) => {
  return css`
    padding: 0 ${theme.space[2]} ${theme.space[3]};
  `
})

export const NavigationWrapper = styled.div(() => {
  return css`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
  `
})
