import styled, { css } from 'styled-components'

export const NewCategory = styled.button(({ theme }) => {
  return css`
    padding: ${theme.space[2]} 0;
    margin-top: ${theme.space[2]};
    border: none;
    width: 100%;
    background: none;
    text-align: center;
    font-size: ${theme.fontSizes[2]};
    cursor: pointer;
    border-top: ${theme.borders.default};
  `
})
