import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout as AntLayout, List, Row, Col, Input, Button, Badge } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
import { getCategoryItems } from 'store/categories/selectors'
import { getTransactionItems } from 'store/transactions/selectors'
import { Transaction as TransactionType } from 'store/transactions/types'
import Transaction from 'components/transaction'
import Layout from 'components/layout'

const { Sider, Content } = AntLayout
const { Search } = Input

interface Params {
  date: string
}

type Props = RouteComponentProps<Params>

const Transactions: React.FC<Props> = ({ match }) => {
  const { date } = match.params
  const transactions = useSelector(getTransactionItems)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const categories = useSelector(getCategoryItems)

  useEffect(() => {
    dispatch(fetchTransactions(date))
    dispatch(fetchCategories())
  }, [dispatch, date])

  const searchFilter = (transaction: TransactionType) => {
    return (
      (!!transaction.merchant && transaction.merchant.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (!!transaction.counterparty.name &&
        transaction.counterparty.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (!transaction.merchant && !searchQuery)
    )
  }

  const categoryFilter = (transaction: TransactionType) => {
    return selectedCategoryId ? transaction.category === selectedCategoryId : true
  }

  return (
    <Layout date={date} backTo={`/${date}/overview`} currentPage='transactions'>
      <AntLayout>
        <Sider width={300} theme='light' style={{ padding: '1rem' }}>
          <Search
            allowClear
            placeholder='Search for a merchant'
            onChange={({ target: { value } }) => setSearchQuery(value)}
          />

          {categories.map((c) => (
            <Button
              type={selectedCategoryId === c.id ? undefined : 'link'}
              key={c.id}
              block
              onClick={() => setSelectedCategoryId(c.id === selectedCategoryId ? null : c.id)}
              style={{ textAlign: 'left', marginTop: '0.5rem' }}
            >
              <Badge color={c.color} text={c.name} />
            </Button>
          ))}
        </Sider>

        <Content style={{ minHeight: '100%' }}>
          <Row type='flex' justify='center'>
            <Col span={10}>
              <List
                size='small'
                dataSource={transactions
                  .filter((t) => t.include_in_spending)
                  .filter(searchFilter)
                  .filter(categoryFilter)}
                renderItem={(transaction) => <Transaction transaction={transaction} />}
              />
            </Col>
          </Row>
        </Content>
      </AntLayout>
    </Layout>
  )
}

export default Transactions
