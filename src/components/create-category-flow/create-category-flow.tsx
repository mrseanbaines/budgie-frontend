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

export enum Step {
  CreateCategory = 'CreateCategory',
  ColorPicker = 'ColorPicker',
}

const CreateCategoryFlow: React.FC<Props> = ({ exitFlow }) => {
  const [step, setStep] = useState<Step>(Step['CreateCategory'])
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
    setStep(Step['CreateCategory'])
  }

  const steps: Record<Step, JSX.Element> = {
    CreateCategory: (
      <Popup onClickOutside={exitFlow} onLeftButtonClick={exitFlow} title='Create a Category' leftButton='close'>
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
    ColorPicker: (
      <Popup
        onClickOutside={exitFlow}
        title='Pick a Color'
        leftButton='back'
        onLeftButtonClick={() => setStep(Step['CreateCategory'])}
      >
        <ColorPicker currentColor={categoryColor} onSetCategoryColor={onSetCategoryColor} />
      </Popup>
    ),
  }

  return steps[step]
}

export default CreateCategoryFlow
