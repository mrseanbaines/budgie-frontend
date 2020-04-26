import styled, { css } from 'styled-components'

import { Props as ListItemProps } from './list-item'

const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    align-items: center;
    gap: ${theme.space[2]};
    padding: ${theme.space[2]} 0;
    border: none;
    width: 100%;
    background: none;
    text-align: left;
  `
})

export const ListHeadingWrapper = styled(Wrapper)(({ theme }) => {
  return css`
    grid-template-columns: auto auto;
    justify-content: space-between;
    color: ${theme.colors.text.muted};
    font-size: ${theme.fontSizes[1]};
    text-transform: uppercase;
    border-bottom: ${theme.borders.default};
  `
})

export const ListItemWrapper = styled(Wrapper).attrs({ as: 'button' })(({ theme }) => {
  return css`
    grid-template-columns: auto 1fr auto;
    font-size: ${theme.fontSizes[2]};
    cursor: pointer;
  `
})

export type BadgeProps = Pick<ListItemProps, 'badgeColor'>

export const Badge = styled.div<BadgeProps>(({ theme, badgeColor }) => {
  return css`
    width: ${theme.sizes.badge[0]};
    height: ${theme.sizes.badge[0]};
    border-radius: ${theme.radii.circle};
    background: ${badgeColor || theme.colors.background.default};
    border: ${!badgeColor && theme.borders.default};
  `
})

export const Title = styled.p(() => {
  return css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `
})

export const Extra = styled.div(({ theme }) => {
  return css`
    svg {
      display: block;
      width: auto;
      height: ${theme.sizes.icon[1]};
    }
  `
})
