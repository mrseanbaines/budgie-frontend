import React from 'react'

import CreateCategory from './create-category'

export default {
  title: 'CreateCategory',
}

export const Default = () => <CreateCategory onCreateCategory={() => {}} transactionId='abc_123' />
