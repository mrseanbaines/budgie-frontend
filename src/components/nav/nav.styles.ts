import styled, { css } from 'styled-components'

export const Wrapper = styled.nav(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    padding: 0 ${theme.space[8]};
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      display: block;
      width: auto;
      height: 20px;
    }

    a {
      padding: ${theme.space[4]};
    }
  `
})
