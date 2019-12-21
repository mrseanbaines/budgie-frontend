import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { format, subMonths } from 'date-fns'

interface Params {
  id: string
}

const Transactions: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { id } = match.params

  const months = Array(6)
    .fill(new Date())
    .map((date, i) => subMonths(date, i))

  return (
    <>
      <h1>Account {id}</h1>

      <nav>
        <ul>
          {months.map(month => (
            <li key={month.toString()}>
              <a href={`/accounts/${id}/${format(month, 'yyyy-MM')}`}>{format(month, 'LLLL')}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Transactions
