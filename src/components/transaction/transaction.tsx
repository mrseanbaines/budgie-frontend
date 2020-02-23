import React, { useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { List, Popconfirm, Icon, notification, Tag, Dropdown, Menu, Badge, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'

import { formatCurrency } from 'utils'
import { Transaction as TransactionType } from 'store/transactions/types'
import { updateTransaction } from 'store/transactions/actions'
import { getCategoryItems } from 'store/categories/selectors'
import { Category as CategoryType } from 'store/categories/types'

import Category from '../category'

interface Props {
  transaction: TransactionType
}

const TextButton: React.FC<JSX.IntrinsicElements['button']> = ({ children, ...props }) => (
  <button {...props} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
    {children}
  </button>
)

const Transaction: React.FC<Props> = ({ transaction }) => {
  const [mouseOver, setMouseOver] = useState(false)
  const categories = useSelector(getCategoryItems)
  const currentCategory = categories.find(c => c.id === transaction.category)
  const merchant = typeof transaction.merchant === 'object' ? transaction.merchant.name : transaction.counterparty.name
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      await dispatch(updateTransaction(transaction.id, null))

      notification.open({
        message: 'Category removed',
        icon: <Icon type='smile' style={{ color: '#108ee9' }} />,
      })
    } catch (error) {
      notification.open({
        message: 'Error while trying to remove category',
        icon: <Icon type='frown' />,
      })
    } finally {
      setMouseOver(false)
    }
  }

  const categoryList = (
    <Menu>
      {categories.map(c => (
        <Menu.Item key={c.id}>
          <TextButton onClick={() => handleSetCategory(c.id)}>
            <Badge color={c.color} text={c.name} />
          </TextButton>
        </Menu.Item>
      ))}
    </Menu>
  )

  const handleSetCategory = async (categoryId: CategoryType['id']) => {
    try {
      await dispatch(updateTransaction(transaction.id, categoryId))

      notification.open({
        message: 'Category set',
        icon: <Icon type='smile' style={{ color: '#108ee9' }} />,
      })
    } catch (error) {
      notification.open({
        message: 'Error while trying to set category',
        icon: <Icon type='frown' />,
      })
    } finally {
      setMouseOver(false)
    }
  }

  return (
    <List.Item
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{ alignItems: 'flex-start' }}
    >
      <List.Item.Meta
        title={merchant}
        description={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {currentCategory ? (
              <>
                {<Category category={currentCategory} />}

                {mouseOver && (
                  <>
                    <div style={{ marginRight: 8 }}>
                      <Dropdown overlay={categoryList} trigger={['click']}>
                        <TextButton>
                          <Tooltip title='Edit Category'>
                            <Icon type='edit' />
                          </Tooltip>
                        </TextButton>
                      </Dropdown>
                    </div>

                    <Popconfirm
                      icon={<Icon type='warning' theme='filled' />}
                      onConfirm={handleDelete}
                      title='Remove this category?'
                      okText='Yes'
                      cancelText='Cancel'
                    >
                      <Tooltip title='Remove Category'>
                        <Icon type='delete' style={{ color: 'lightcoral' }} />
                      </Tooltip>
                    </Popconfirm>
                  </>
                )}
              </>
            ) : (
              <>
                {mouseOver && (
                  <Dropdown overlay={categoryList} trigger={['click']}>
                    <Tag color='grey' style={{ cursor: 'pointer' }}>
                      <Icon type='plus' /> Set Category
                    </Tag>
                  </Dropdown>
                )}
              </>
            )}
          </div>
        }
      />

      <List.Item.Meta
        title={formatCurrency(transaction.amount)}
        description={format(new Date(transaction.created), 'dd MMM')}
        style={{ flex: 'initial', textAlign: 'right' }}
      />
    </List.Item>
  )
}

export default Transaction
