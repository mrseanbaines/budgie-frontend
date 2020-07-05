import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[4]};
    padding: 0 ${theme.space[2]};
  `
})

export interface CategoryColorProps {
  color: string | undefined
}

export const CategoryColor = styled.button<CategoryColorProps>(({ theme, color }) => {
  return css`
    width: ${theme.sizes.badge[3]};
    height: ${theme.sizes.badge[3]};
    border-radius: ${theme.radii.circle};
    background: ${color};
    margin: 0 auto;
    border: none;
    padding: 0;
    cursor: pointer;
  `
})
