import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import ColorPicker from 'components/color-picker'
import Category from 'components/category'
import Popup from 'components/popup'
import { Category as CategoryType } from 'store/categories/types'
import { createCategory } from 'store/categories/actions'
import { colors } from 'theme'

export interface Props {
  exitFlow: () => void
}

const CreateCategoryFlow: React.FC<Props> = ({ exitFlow }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState(colors.categories[0])
  const dispatch = useDispatch()

  const handleCreateCategory = async (e: any) => {
    e.preventDefault()

    try {
      await dispatch(createCategory({ name: categoryName, color: categoryColor }))

      exitFlow()
    } catch (error) {
      console.error(error)
    }
  }

  const onSetCategoryColor = (color: CategoryType['color']) => {
    setCategoryColor(color)
    setActiveStep(0)
  }

  const steps = [
    <Popup onClickOutside={exitFlow} onLeftButtonClick={exitFlow} title='Create a Category' leftButton='close'>
      <Category
        onEditColor={() => setActiveStep(1)}
        onFormSubmit={handleCreateCategory}
        categoryColor={categoryColor}
        currentName={categoryName}
        setCategoryName={setCategoryName}
        submitText='Create'
      />
    </Popup>,
    <Popup onClickOutside={exitFlow} title='Pick a Color' leftButton='back' onLeftButtonClick={() => setActiveStep(0)}>
      <ColorPicker currentColor={categoryColor} onSetCategoryColor={onSetCategoryColor} />
    </Popup>,
  ]

  return steps[activeStep]
}

export default CreateCategoryFlow
