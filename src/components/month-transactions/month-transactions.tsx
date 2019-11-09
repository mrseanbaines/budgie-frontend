import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { addMonths, format } from 'date-fns';

interface Params {
  id: string;
  date: string;
}

type Props = RouteComponentProps<Params>;

const MonthTransactions: React.FC<Props> = ({ match }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { id, date } = match.params;

  useEffect(() => {
    const fetchAccounts = async () => {
      const { REACT_APP_MONZO_BASE_URL = '' } = process.env;
      const accessToken = sessionStorage.getItem('token');

      const query = new URLSearchParams({
        account_id: id,
        since: new Date(date).toISOString(),
        before: new Date(addMonths(new Date(date), 1)).toISOString(),
      });

      try {
        const response = await fetch(`${REACT_APP_MONZO_BASE_URL}/transactions?${query}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const json = await response.json();

        if (response.status !== 200) {
          setError(json.message);
          return;
        }

        setTransactions(json.transactions);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchAccounts();
  }, [id, date]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>{format(new Date(date), 'LLLL')} Transactions</h1>

      {transactions.map(({ id, amount, currency, description, category, created }) => (
        <div key={id}>
          <div>
            <small>{format(new Date(created), 'dd MMMM, yyyy')}</small>
          </div>
          <div>
            {amount / 100} {currency}
          </div>
          <div>{description}</div>
          <div>
            <strong>{category}</strong>
          </div>
          <br />
        </div>
      ))}
    </>
  );
};

export default MonthTransactions;
