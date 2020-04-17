import React from 'react'

import { BackIcon, CloseIcon, ForwardIcon, TickIcon, PlusIcon } from 'components/icons'
import theme from 'theme'

import * as s from './popup.styles'

interface Props {
  title?: string
  leftButton?: 'back' | 'close'
  rightButton?: 'forward' | 'tick' | 'plus'
  onLeftButtonClick?: () => void
  onRightButtonClick?: () => void
}

const Popup: React.FC<Props> = ({
  children,
  title,
  leftButton,
  rightButton,
  onLeftButtonClick,
  onRightButtonClick,
}) => (
  <s.Wrapper>
    <s.Controls>
      <div>
        {leftButton && leftButton === 'back' && (
          <s.Button onClick={onLeftButtonClick}>
            <BackIcon color={theme.colors.icons.default} />
          </s.Button>
        )}
        {leftButton && leftButton === 'close' && (
          <s.Button onClick={onLeftButtonClick}>
            <CloseIcon color={theme.colors.icons.default} />
          </s.Button>
        )}
      </div>

      {title && <s.Title>{title}</s.Title>}

      <div>
        {rightButton && rightButton === 'forward' && (
          <s.Button onClick={onRightButtonClick}>
            <ForwardIcon color={theme.colors.icons.default} />
          </s.Button>
        )}
        {rightButton && rightButton === 'tick' && (
          <s.Button onClick={onRightButtonClick}>
            <TickIcon color={theme.colors.icons.default} />
          </s.Button>
        )}
        {rightButton && rightButton === 'plus' && (
          <s.Button onClick={onRightButtonClick}>
            <PlusIcon color={theme.colors.icons.default} />
          </s.Button>
        )}
      </div>
    </s.Controls>

    {children}
  </s.Wrapper>
)

export default Popup
