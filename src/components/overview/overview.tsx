import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { addMonths, format } from 'date-fns';

import { formatCurrency } from 'utils';
import { Transaction } from 'types';

interface Params {
  id: string;
  date: string;
}

type Props = RouteComponentProps<Params>;

interface All {
  [k: string]: number;
}

interface InOut {
  in: number;
  out: number;
}

const MonthOverview: React.FC<Props> = ({ match }) => {
  const [breakdown, setBreakdown] = useState<[string, number][]>([]);
  const [total, setTotal] = useState<number>(0);
  const [inOut, setInOut] = useState<InOut>({ in: 0, out: 0 });
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

        const breakdown: [string, number][] = Object.entries(
          json.transactions
            .filter(({ include_in_spending }: Transaction) => include_in_spending)
            .reduce((all: All, { category, amount }: Transaction) => {
              if (category in all) {
                all[category] += amount;
              } else {
                all[category] = amount;
              }

              return all;
            }, {}),
        );

        const total = json.transactions
          .filter(({ include_in_spending }: Transaction) => {
            if (!include_in_spending) {
              return false;
            }
            return true;
          })
          .reduce((sum: any, { amount }: Transaction) => sum + amount, 0);

        const inOut = json.transactions.reduce(
          (sum: any, { amount }: Transaction) => {
            if (amount < 0) {
              sum.out += amount;
            } else {
              sum.in += amount;
            }
            return sum;
          },
          { in: 0, out: 0 },
        );

        setBreakdown(breakdown);
        setTotal(total);
        setInOut(inOut);
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
      <h1>{format(new Date(date), 'LLLL')} Overview</h1>

      {breakdown.map(([category, amount]) => (
        <p key={category}>
          <strong>{category} </strong>
          {formatCurrency(amount)}
        </p>
      ))}

      {breakdown.length > 0 && (
        <>
          <hr />

          <p>
            <strong>Total Spent: </strong>
            {formatCurrency(total)}
          </p>

          <hr />

          <p>
            <strong>Total In: </strong>
            {formatCurrency(inOut.in)}
          </p>

          <p>
            <strong>Total Out: </strong>
            {formatCurrency(inOut.out)}
          </p>
        </>
      )}
    </>
  );
};

export default MonthOverview;
