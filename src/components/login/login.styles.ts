import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[4]};
    padding: ${theme.space[8]} ${theme.space[4]};
  `
})

export const Title = styled.h1(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[6]};
    text-align: center;
  `
})

export const Form = styled.form(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[4]};
  `
})

export const Fieldset = styled.fieldset(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[2]};
    margin: 0;
    padding: 0;
    border: none;
  `
})

export const Label = styled.label(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[1]};
  `
})

export const FormError = styled.p(({ theme }) => {
  return css`
    padding-bottom: ${theme.space[4]};
    border-bottom: ${theme.borders.default};
    color: ${theme.colors.text.danger};
    font-size: ${theme.fontSizes[0]};
  `
})
