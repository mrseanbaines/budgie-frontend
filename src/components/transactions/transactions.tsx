import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { List, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
import { getTransactionItems } from 'store/transactions/selectors'
import Transaction from 'components/transaction'
import Layout from 'components/layout'

interface Params {
  date: string
}

type Props = RouteComponentProps<Params>

const Transactions: React.FC<Props> = ({ match }) => {
  const { date } = match.params
  const transactions = useSelector(getTransactionItems)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions(date))
    dispatch(fetchCategories())
  }, [dispatch, date])

  return (
    <Layout date={date}>
      <Row type='flex' justify='center'>
        <Col span={10}>
          <List
            size='small'
            dataSource={transactions}
            renderItem={transaction => <Transaction transaction={transaction} />}
          />
        </Col>
      </Row>
    </Layout>
  )
}

export default Transactions
