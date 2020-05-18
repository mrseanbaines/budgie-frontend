import styled, { css } from 'styled-components'

import { Props as ListItemProps } from './list-item'
import { Props as ListHeadingProps } from './list-heading'

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
    user-select: none;
  `
})

export type ListHeadingWrapperProps = Pick<ListHeadingProps, 'onClick'>

export const ListHeadingWrapper = styled(Wrapper)<ListHeadingWrapperProps>(({ theme, onClick }) => {
  return css`
    grid-template-columns: auto auto;
    justify-content: space-between;
    color: ${theme.colors.text.muted};
    font-size: ${theme.fontSizes[1]};
    text-transform: uppercase;
    border-bottom: ${theme.borders.default};
    cursor: ${onClick && 'pointer'};

    > :first-child {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      gap: 8px;
    }
  `
})

export const ListItemWrapperBtn = styled.button(() => {
  return css`
    width: 100%;
    border: none;
    background: none;
    display: block;
    margin: 0;
    padding: 0;
    cursor: pointer;
  `
})

export const ListItemWrapper = styled(Wrapper)(({ theme }) => {
  return css`
    grid-template-columns: auto 1fr auto;
    font-size: ${theme.fontSizes[2]};
  `
})

export interface BadgeProps extends Pick<ListItemProps, 'badgeColor'> {
  small?: boolean
}

export const Badge = styled.div<BadgeProps>(({ theme, badgeColor, small }) => {
  return css`
    width: ${theme.sizes.badge[small ? 0 : 1]};
    height: ${theme.sizes.badge[small ? 0 : 1]};
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
