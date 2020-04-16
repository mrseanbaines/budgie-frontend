import styled, { css } from 'styled-components'

import { Props as ListItemProps } from './list-item'

export const Border = styled.hr(({ theme }) => {
  return css`
    border: none;
    border-bottom: ${theme.borders.default};
    margin: 0 ${theme.space[4]};
    margin-bottom: ${theme.space[2]};
  `
})

const Wrapper = styled.div(({ theme }) => {
  return css`
    display: grid;
    align-items: center;
    gap: ${theme.space[2]};
    padding: ${theme.space[3]} ${theme.space[4]};
    line-height: 1;
  `
})

export const ListHeadingWrapper = styled(Wrapper)(({ theme }) => {
  return css`
    grid-template-columns: auto auto;
    justify-content: space-between;
    color: ${theme.colors.text.muted};
    font-size: ${theme.fontSizes[1]};
    text-transform: uppercase;
  `
})

export const ListItemWrapper = styled(Wrapper)(({ theme }) => {
  return css`
    grid-template-columns: auto 1fr auto;
    color: ${theme.colors.text.default};
    font-size: ${theme.fontSizes[2]};
  `
})

type BadgeProps = Pick<ListItemProps, 'badgeColor'>

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
    line-height: 1;
  `
})
