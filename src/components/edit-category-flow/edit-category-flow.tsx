import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import ColorPicker from 'components/color-picker'
import Category from 'components/category'
import Popup from 'components/popup'
import { Category as CategoryType } from 'store/categories/types'
import { editCategory, deleteCategory } from 'store/categories/actions'

export interface Props {
  category: CategoryType
  exitFlow: () => void
}

const EditCategoryFlow: React.FC<Props> = ({ category, exitFlow }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [categoryName, setCategoryName] = useState(category.name)
  const [categoryColor, setCategoryColor] = useState(category.color)
  const dispatch = useDispatch()

  const handleEditCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (categoryName !== category.name || categoryColor !== category.color) {
        await dispatch(editCategory(category.id, { name: categoryName, color: categoryColor }))
      }

      exitFlow()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCategory = async () => {
    await dispatch(deleteCategory(category.id))

    exitFlow()
  }

  const onSetCategoryColor = (color: CategoryType['color']) => {
    setCategoryColor(color)
    setActiveStep(0)
  }

  const steps = [
    <Popup
      title='Edit Category'
      leftButton='close'
      onLeftButtonClick={exitFlow}
      rightButton='trash'
      onRightButtonClick={handleDeleteCategory}
      onClickOutside={exitFlow}
    >
      <Category
        onEditColor={() => setActiveStep(1)}
        onFormSubmit={handleEditCategory}
        categoryColor={categoryColor}
        currentName={categoryName}
        setCategoryName={setCategoryName}
        submitText='Save'
      />
    </Popup>,
    <Popup onClickOutside={exitFlow} title='Pick a Color' leftButton='back' onLeftButtonClick={() => setActiveStep(0)}>
      <ColorPicker currentColor={categoryColor} onSetCategoryColor={onSetCategoryColor} />
    </Popup>,
  ]

  return steps[activeStep]
}

export default EditCategoryFlow
