import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Account } from 'types';

const Accounts: React.FC<RouteComponentProps> = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const { REACT_APP_MONZO_BASE_URL = '' } = process.env;
      const accessToken = sessionStorage.getItem('token');

      try {
        const response = await fetch(`${REACT_APP_MONZO_BASE_URL}/accounts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const json = await response.json();

        if (response.status !== 200) {
          setError(json.message);
          return;
        }

        setAccounts(json.accounts);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchAccounts();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Accounts</h1>

      {accounts.map(({ type, owners, id }) => (
        <Link to={`/accounts/${id}`} key={id}>
          <p>
            <strong>{type}</strong>
          </p>

          {owners.map(({ preferred_name, user_id }) => (
            <p key={user_id}>{preferred_name}</p>
          ))}
        </Link>
      ))}
    </>
  );
};

export default Accounts;
