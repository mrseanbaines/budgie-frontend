import styled, { css } from 'styled-components'

export const Container = styled.div(({ theme }) => {
  return css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: ${theme.space[2]};
    padding-bottom: 0;
    background: ${theme.colors.overlay};
    z-index: ${theme.zIndices.popup};
  `
})

export const Wrapper = styled.div(({ theme }) => {
  return css`
    background: ${theme.colors.background.default};
    padding: ${theme.space[2]};
    border-radius: ${theme.radii.rounded[1]};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  `
})

export const Title = styled.p(({ theme }) => {
  return css`
    font-size: ${theme.fontSizes[2]};
    text-align: center;
  `
})

export const Controls = styled.div(({ theme }) => {
  return css`
    padding: ${theme.space[2]};
    margin-bottom: ${theme.space[2]};
    align-items: center;
    display: grid;
    grid-template-columns: 1fr auto 1fr;

    > :nth-child(3) {
      text-align: right;
    }

    svg {
      color: ${theme.colors.icons.default};
      display: block;
      width: auto;
      height: 100%;
    }
  `
})

export const Button = styled.button(({ theme }) => {
  return css`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    width: ${theme.sizes.icon[1]};
    height: ${theme.sizes.icon[1]};
  `
})

export const TrashIcon = styled.div(({ theme }) => {
  return css`
    svg {
      width: 100%;
      height: 100%;
      padding: ${theme.space[1]};
      color: ${theme.colors.icons.danger};
    }
  `
})

export const ScrollableArea = styled.div(() => {
  return css`
    overflow: auto;
  `
})
