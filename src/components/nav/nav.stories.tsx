import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import Nav from './nav'

export default {
  title: 'Nav',
  decorators: [(getStory: Function) => <MemoryRouter>{getStory()}</MemoryRouter>],
}

export const Default = () => <Nav />
