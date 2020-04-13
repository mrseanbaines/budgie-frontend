import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { List, Row, Col, Badge } from 'antd'

import { formatCurrency } from 'utils'
import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
import { getTransactionItems } from 'store/transactions/selectors'
import { getCategoryItems } from 'store/categories/selectors'
import { Category } from 'store/categories/types'
import Layout from 'components/layout'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

interface BreakdownItem extends Category {
  amount: number
}

const Overview: React.FC<Props> = ({ match }) => {
  const { date } = match.params
  const [breakdown, setBreakdown] = useState<BreakdownItem[]>([])
  const [uncategorised, setUncategorised] = useState<number>(0)
  const [totalCategorised, setTotalUncategorised] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const dispatch = useDispatch()
  const transactions = useSelector(getTransactionItems)
  const categories = useSelector(getCategoryItems)

  useEffect(() => {
    dispatch(fetchTransactions(date))
    dispatch(fetchCategories())
  }, [dispatch, date])

  useEffect(() => {
    const categoryTotals = categories.map(category => {
      const amount = transactions
        // .filter(t => t.include_in_spending)
        .reduce((total: number, transaction) => {
          if (transaction.category === category.id) {
            return total + transaction.amount
          }

          return total
        }, 0)

      return { ...category, amount }
    })

    const uncategorisedTotal = transactions
      // .filter(t => t.include_in_spending)
      .reduce((total: number, transaction) => {
        if (!transaction.category) {
          return total + transaction.amount
        }

        return total
      }, 0)

    const totalAmountCategorised = categoryTotals.reduce((sum, item) => sum + item.amount, 0)

    const totalAmount = totalAmountCategorised + uncategorisedTotal

    setBreakdown(categoryTotals)
    setUncategorised(uncategorisedTotal)
    setTotalUncategorised(totalAmountCategorised)
    setTotal(totalAmount)
  }, [categories, transactions])

  return (
    <Layout date={date} backTo={`/${date}/transactions`} currentPage='overview'>
      <Row type='flex' justify='center'>
        <Col span={10}>
          <List
            size='small'
            dataSource={breakdown}
            renderItem={category => (
              <List.Item style={{ alignItems: 'flex-start' }}>
                <List.Item.Meta title={<Badge color={category.color} text={category.name} />} />
                <List.Item.Meta
                  title={formatCurrency(category.amount)}
                  style={{ flex: 'initial', textAlign: 'right' }}
                />
              </List.Item>
            )}
            footer={
              <>
                <Row style={{ padding: '8px 0' }} type='flex' justify='space-between'>
                  <strong>Total Categorised</strong> {formatCurrency(totalCategorised)}
                </Row>
                <Row style={{ padding: '8px 0' }} type='flex' justify='space-between'>
                  <strong>Total Uncategorised</strong> {formatCurrency(uncategorised)}
                </Row>
                <Row style={{ padding: '8px 0' }} type='flex' justify='space-between'>
                  <strong>Total</strong> {formatCurrency(total)}
                </Row>
              </>
            }
          />
        </Col>
      </Row>
    </Layout>
  )
}

export default Overview
