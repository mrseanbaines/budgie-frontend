import styled, { css } from 'styled-components'

export const Overlay = styled.div(({ theme }) => {
  return css`
    width: 100%;
    height: 100%;
    position: fixed;
    top: auto;
    left: 0;
    background: ${theme.colors.overlay};
    z-index: ${theme.zIndices.dateSelect};
  `
})

export const Wrapper = styled.div(({ theme }) => {
  return css`
    width: 100%;
    position: fixed;
    top: auto;
    left: 0;
    display: flex;
    align-items: center;
    background: ${theme.colors.background.default};
    border-bottom: ${theme.borders.default};
    overflow-x: auto;
    direction: rtl;

    > *:last-child {
      margin-left: auto;
    }
  `
})

export const DateGroup = styled.button(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding: ${theme.space[3]} ${theme.space[4]};
    border: none;
    background: none;
    cursor: pointer;
    direction: ltr;
  `
})

export const Date = styled.div(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[1]};
  `
})

export const Total = styled.div(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[1]};
    color: ${theme.colors.text.muted};
  `
})
