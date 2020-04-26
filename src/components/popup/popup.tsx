import React, { useRef } from 'react'

import useOnClickOutside from 'hooks/use-on-click-outside'
import { ReactComponent as BackIcon } from 'icons/back.svg'
import { ReactComponent as CloseIcon } from 'icons/close.svg'
import { ReactComponent as ForwardIcon } from 'icons/forward.svg'
import { ReactComponent as TickIcon } from 'icons/tick.svg'
import { ReactComponent as PlusIcon } from 'icons/plus.svg'
import { ReactComponent as TrashIcon } from 'icons/trash.svg'

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
  const ref = useRef(null)

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

        {children}
      </s.Wrapper>
    </s.Container>
  )
}

export default Popup
