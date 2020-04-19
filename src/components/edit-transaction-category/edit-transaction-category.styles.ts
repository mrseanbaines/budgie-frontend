import styled, { css } from 'styled-components'

export const NewCategory = styled.button(({ theme }) => {
  return css`
    padding: ${theme.space[2]} 0;
    border: none;
    width: 100%;
    background: none;
    text-align: center;
    color: ${theme.colors.text.default};
    font-size: ${theme.fontSizes[2]};
    cursor: pointer;
    border-top: ${theme.borders.default};
  `
})
