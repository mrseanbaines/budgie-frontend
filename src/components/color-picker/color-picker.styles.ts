import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    row-gap: ${theme.space[4]};
    grid-template-columns: repeat(6, auto);
    justify-content: space-between;
    padding: ${theme.space[2]};
  `
})

export interface CategoryColorProps {
  color: string | undefined
  selected: boolean
}

export const CategoryColor = styled.button<CategoryColorProps>(({ theme, color, selected }) => {
  return css`
    width: ${theme.sizes.badge[2]};
    height: ${theme.sizes.badge[2]};
    border-radius: ${theme.radii.circle};
    background: ${color};
    margin: 0 auto;
    border: none;
    padding: 0;
    cursor: pointer;
    box-shadow: 2px 4px 0 0 rgba(0, 0, 0, 0.1) inset ${selected && `, 0 0 0 4px rgba(0, 0, 0, 0.1)`};
  `
})
