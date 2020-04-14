import styled, { css } from 'styled-components'

export const Input = styled.input(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    padding: ${theme.space[3]} ${theme.space[4]};
    border: ${theme.borders.default};
    border-radius: ${theme.radii.rounded[0]};
    font-size: ${theme.fontSizes[1]};
    line-height: 1;
    width: 100%;
    color: ${theme.colors.text.default};

    ::placeholder {
      color: ${theme.colors.text.muted};
      opacity: 1;
    }
  `
})