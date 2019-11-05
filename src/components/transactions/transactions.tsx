import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Params {
  id: string;
}

const Transactions: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { id } = match.params;

  useEffect(() => {
    const fetchAccounts = async () => {
      const { REACT_APP_MONZO_BASE_URL = '' } = process.env;
      const accessToken = sessionStorage.getItem('token');

      try {
        const response = await fetch(`${REACT_APP_MONZO_BASE_URL}/transactions?account_id=${id}`, {
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
  }, [id]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Transactions</h1>
      {transactions.map(({ amount, currency, description, category, created }) => (
        <p>
          <div>
            <small>{created}</small>
          </div>
          <div>
            {amount / 100} {currency}
          </div>
          <div>{description}</div>
          <div>
            <strong>{category}</strong>
          </div>
        </p>
      ))}
    </>
  );
};

export default Transactions;
