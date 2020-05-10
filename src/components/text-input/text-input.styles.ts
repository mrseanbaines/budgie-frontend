import styled, { css } from 'styled-components'

export const Input = styled.input(({ theme }) => {
  return css`
    background: ${theme.colors.background.muted};
    padding: ${theme.space[3]} ${theme.space[4]};
    border: 1px solid transparent;
    border-radius: ${theme.radii.rounded[0]};
    font-size: ${theme.fontSizes[1]};
    width: 100%;
    appearance: none;
    font-family: revert;
    outline: none;

    :focus {
      border-color: ${theme.colors.brand};
    }

    ::placeholder {
      color: ${theme.colors.text.muted};
      opacity: 1;
    }
  `
})
