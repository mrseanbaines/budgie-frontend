import styled, { css } from 'styled-components'

import { Props } from './text-input'

export const InputWrapper = styled.div(({ theme }) => {
  return css`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;

    > span {
      position: absolute;
      padding: ${theme.space[3]} ${theme.space[4]};
      pointer-events: none;
    }
  `
})

interface InputProps {
  currency: Props['currency']
}

export const Input = styled.input<InputProps>(({ theme, currency }) => {
  return css`
    background: ${theme.colors.background.muted};
    padding: ${theme.space[3]} ${theme.space[4]};
    padding-left: ${currency && theme.space[8]};
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
