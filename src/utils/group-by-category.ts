import * as R from 'ramda'

import { Transaction } from 'store/transactions/types'

interface Item {
  category: Transaction['category']
}

const groupByCategory = <T extends Item>(items: T[]) => {
  // const orderedItems = R.sort(
  //   R.descend(item => item.category),
  //   items.filter(item => !!item.category),
  // )

  const orderedItems = R.sort(
    R.descend(item => item.category || ''),
    items,
  )

  return R.groupWith((a, b) => a.category === b.category, orderedItems)
}

export default groupByCategory
