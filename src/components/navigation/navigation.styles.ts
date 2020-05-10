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
      height: ${theme.sizes.icon[0]};
    }

    a {
      padding: ${theme.space[4]};
      color: ${theme.colors.icons.default};

      &.active {
        color: ${theme.colors.brand};
      }
    }
  `
})
