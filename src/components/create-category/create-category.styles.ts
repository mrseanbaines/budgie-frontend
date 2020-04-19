import styled, { css } from 'styled-components'

export const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    gap: ${theme.space[4]};
  `
})

interface CategoryColorProps {
  color: string | undefined
}

export const CategoryColor = styled.button<CategoryColorProps>(({ theme, color }) => {
  return css`
    width: ${theme.sizes.badge[2]};
    height: ${theme.sizes.badge[2]};
    border-radius: ${theme.radii.circle};
    background: ${color};
    margin: 0 auto;
    border: none;
    padding: 0;
    cursor: pointer;
  `
})

export const CreateCategory = styled.button.attrs({ type: 'submit' })(({ theme }) => {
  return css`
    padding: ${theme.space[2]} 0;
    border: none;
    width: 100%;
    background: none;
    text-align: center;
    font-size: ${theme.fontSizes[2]};
    cursor: pointer;
  `
})
