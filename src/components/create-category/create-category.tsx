import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { createCategory } from 'store/categories/actions'
import { updateTransaction } from 'store/transactions/actions'
import { Transaction } from 'store/transactions/types'
import Popup from 'components/popup'
import TextInput from 'components/text-input'
import { colors } from 'theme'

import * as s from './create-category.styles'

interface Props {
  onLeftButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCreateCategory: () => void
  onClickOutside?: (e: Event) => void
  transactionId: Transaction['id']
}

const TransactionDetails: React.FC<Props> = ({
  onLeftButtonClick,
  onCreateCategory,
  transactionId,
  onClickOutside,
}) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState(colors.categories[0])
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  })

  const handleCreateCategory = async (e: any) => {
    e.preventDefault()

    try {
      // TODO: Fix typing here
      const category: any = await dispatch(createCategory({ name, color }))
      dispatch(updateTransaction(transactionId, category.id))
    } catch (error) {
      console.error(error)
    } finally {
      onCreateCategory()
    }
  }

  return (
    <Popup
      onClickOutside={onClickOutside}
      title='Create a Category'
      leftButton='back'
      onLeftButtonClick={onLeftButtonClick}
    >
      <s.Wrapper>
        <s.CategoryColor color={color} />

        <form onSubmit={handleCreateCategory}>
          <TextInput
            ref={inputRef}
            placeholder='Enter a name'
            onChange={({ target: { value } }) => setName(value)}
            value={name}
          />

          <s.CreateCategory onClick={handleCreateCategory}>Create Category</s.CreateCategory>
        </form>
      </s.Wrapper>
    </Popup>
  )
}

export default TransactionDetails
