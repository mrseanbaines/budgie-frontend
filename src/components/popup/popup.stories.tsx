import React from 'react'

import Popup from './popup'

export default {
  title: 'Popup',
}

export const Default = () => <Popup />

export const WithTitle = () => <Popup title='Select a Category' />

export const WithControls = () => <Popup leftButton='back' rightButton='plus' title='Select a Category' />

export const WithBackButton = () => <Popup leftButton='back' />

export const WithBackButtonAndTitle = () => <Popup leftButton='back' title='Select a Category' />

export const WithPlusButtonAndTitle = () => <Popup rightButton='plus' title='Select a Category' />

export const WithCloseButton = () => <Popup leftButton='close' />

export const WithForwardButton = () => <Popup rightButton='forward' />

export const WithTickButton = () => <Popup rightButton='tick' />

export const WithPlusButton = () => <Popup rightButton='plus' />

export const WithContent = () => (
  <Popup>
    <h1 style={{ textAlign: 'center' }}>Hello, world!</h1>
  </Popup>
)

export const WithContentAndControls = () => (
  <Popup leftButton='back' rightButton='plus' title='Select a Category'>
    <h1 style={{ textAlign: 'center' }}>Hello, world!</h1>
  </Popup>
)
