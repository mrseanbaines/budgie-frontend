import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import ColorPicker from 'components/color-picker'
import Category from 'components/category'
import Popup from 'components/popup'
import { Category as CategoryType } from 'store/categories/types'
import { editCategory, createCategory } from 'store/categories/actions'

export interface Props {
  category: CategoryType
  exitFlow: () => void
}

export enum Step {
  EditCategory = 'EditCategory',
  ColorPicker = 'ColorPicker',
  CreateCategory = 'CreateCategory',
}

const EditCategoryFlow: React.FC<Props> = ({ category, exitFlow }) => {
  const [step, setStep] = useState<Step>(Step['EditCategory'])
  const [categoryName, setCategoryName] = useState(category.name)
  const [categoryColor, setCategoryColor] = useState(category.color)
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

  const handleEditCategory = async (e: any) => {
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

  const onSetCategoryColor = (color: CategoryType['color']) => {
    setCategoryColor(color)
    setStep(Step['EditCategory'])
  }

  const steps = {
    EditCategory: (
      <Popup onClickOutside={exitFlow} onLeftButtonClick={exitFlow} title='Edit Category' leftButton='close'>
        <Category
          onEditColor={() => setStep(Step['ColorPicker'])}
          onFormSubmit={handleEditCategory}
          categoryColor={categoryColor}
          currentName={categoryName}
          setCategoryName={setCategoryName}
          submitText='Save'
        />
      </Popup>
    ),
    ColorPicker: (
      <Popup
        onClickOutside={exitFlow}
        title='Pick a Color'
        leftButton='back'
        onLeftButtonClick={() => setStep(Step['EditCategory'])}
      >
        <ColorPicker currentColor={categoryColor} onSetCategoryColor={onSetCategoryColor} />
      </Popup>
    ),
    CreateCategory: (
      <Popup
        onClickOutside={exitFlow}
        onLeftButtonClick={() => setStep(Step['ColorPicker'])}
        title='Create a Category'
        leftButton='back'
      >
        <Category
          onEditColor={() => setStep(Step['ColorPicker'])}
          onFormSubmit={handleCreateCategory}
          categoryColor={categoryColor}
          currentName={categoryName}
          setCategoryName={setCategoryName}
          submitText='Create'
        />
      </Popup>
    ),
  }

  return steps[step]
}

export default EditCategoryFlow
