import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import Navigation from './navigation'

export default {
  title: 'Navigation',
  decorators: [(getStory: Function) => <MemoryRouter>{getStory()}</MemoryRouter>],
}

export const Default = () => <Navigation />
