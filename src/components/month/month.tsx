import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { format } from 'date-fns'

interface Params {
  id: string
  date: string
}

type Props = RouteComponentProps<Params>

const Month: React.FC<Props> = ({ match }) => {
  const { id, date } = match.params

  return (
    <>
      <h1>{format(new Date(date), 'LLLL')}</h1>

      <nav>
        <ul>
          <li>
            <Link to={`/accounts/${id}/${date}/transactions`}>
              Transactions
            </Link>
          </li>
          <li>
            <Link to={`/accounts/${id}/${date}/overview`}>Overview</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Month
