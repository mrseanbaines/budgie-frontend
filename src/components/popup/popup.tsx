import React, { useRef } from 'react'

import { useOnClickOutside } from 'hooks'
import { BackIcon, CloseIcon, ForwardIcon, TickIcon, PlusIcon, TrashIcon } from 'icons'

import * as s from './popup.styles'

export interface Props {
  title?: string
  leftButton?: 'back' | 'close'
  rightButton?: 'forward' | 'tick' | 'plus' | 'trash'
  onLeftButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onRightButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickOutside?: (e: Event) => void
}

const Popup: React.FC<Props> = ({
  children,
  title,
  leftButton,
  rightButton,
  onLeftButtonClick,
  onRightButtonClick,
  onClickOutside,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onClickOutside)

  const icons = {
    back: <BackIcon />,
    close: <CloseIcon />,
    forward: <ForwardIcon />,
    tick: <TickIcon />,
    plus: <PlusIcon />,
    trash: (
      <s.TrashIcon>
        <TrashIcon />
      </s.TrashIcon>
    ),
  }

  return (
    <s.Container>
      <s.Wrapper ref={ref}>
        <s.Controls>
          <div>{leftButton && <s.Button onClick={onLeftButtonClick}>{icons[leftButton]}</s.Button>}</div>

          <div>{title && <s.Title>{title}</s.Title>}</div>

          <div>{rightButton && <s.Button onClick={onRightButtonClick}>{icons[rightButton]}</s.Button>}</div>
        </s.Controls>

        <s.ScrollableArea>{children}</s.ScrollableArea>
      </s.Wrapper>
    </s.Container>
  )
}

export default Popup
