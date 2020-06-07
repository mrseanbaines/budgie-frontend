import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    width: 100%;
    height: 100%;
    position: fixed;
    top: auto;
    left: 0;
    background: ${theme.colors.background.default};
    padding: ${theme.space[3]} ${theme.space[2]};
    display: grid;
    align-content: start;
  `
})
