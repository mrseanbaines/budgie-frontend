import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout as AntLayout, List, Row, Col, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
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

  useEffect(() => {
    dispatch(fetchTransactions(date))
    dispatch(fetchCategories())
  }, [dispatch, date])

  const searchFilter = (transaction: TransactionType) => {
    return (
      (typeof transaction.merchant === 'object' &&
        transaction.merchant.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof transaction.merchant === 'string' &&
        transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()))
    )
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
        </Sider>

        <Content style={{ minHeight: '100%' }}>
          <Row type='flex' justify='center'>
            <Col span={10}>
              <List
                size='small'
                dataSource={transactions.filter(searchFilter)}
                renderItem={transaction => <Transaction transaction={transaction} />}
              />
            </Col>
          </Row>
        </Content>
      </AntLayout>
    </Layout>
  )
}

export default Transactions
