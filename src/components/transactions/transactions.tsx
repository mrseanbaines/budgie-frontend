import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'
import { List, Row, Col, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTransactions } from 'store/transactions/actions'
import { fetchCategories } from 'store/categories/actions'
import { getTransactionItems } from 'store/transactions/selectors'
import Transaction from 'components/transaction'

const { Title } = Typography

interface Params {
  id: string
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
    <Row type='flex' justify='center'>
      <Col span={10}>
        <Title>{format(new Date(date), 'LLLL')} Transactions</Title>

        <List
          size='small'
          dataSource={transactions}
          renderItem={transaction => <Transaction transaction={transaction} />}
        />
      </Col>
    </Row>
  )
}

export default Transactions
