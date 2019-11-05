import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Owner {
  user_id: string;
  preferred_name: string;
}

interface Account {
  id: string;
  type: 'uk_retail' | 'uk_retail_joint' | 'uk_prepaid';
  owners: Owner[];
}

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
        <button key={id}>
          <p>
            <strong>{type}</strong>
          </p>

          {owners.map(({ preferred_name, user_id }) => (
            <p key={user_id}>{preferred_name}</p>
          ))}
        </button>
      ))}
    </>
  );
};

export default Accounts;
