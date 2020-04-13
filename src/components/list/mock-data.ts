import { colors } from 'theme'

export const transactions = [
  {
    date: 'Wed 8 Apr',
    total: '£61.99',
    transactions: [{ merchant: `Sainsbury's`, amount: '£61.99', category: { color: colors.categories[0] } }],
  },
  {
    date: 'Sat 21 Mar',
    total: '£26.97',
    transactions: [
      { merchant: `McDonald's`, amount: '£3.08', category: { color: colors.categories[1] } },
      { merchant: 'The Perfume Shop', amount: '£20.99', category: { color: colors.categories[2] } },
      { merchant: 'Crow Coffee Ltd', amount: '£2.90', category: { color: colors.categories[1] } },
    ],
  },
  {
    date: 'Fri 20 Mar',
    total: '£11.25',
    transactions: [
      { merchant: 'Co-op', amount: '£2.25', category: { color: colors.categories[0] } },
      { merchant: 'Co-op', amount: '£9.00', category: { color: colors.categories[0] } },
    ],
  },
]
