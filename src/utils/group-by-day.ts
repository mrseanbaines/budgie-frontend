import { isSameDay } from 'date-fns'
import * as R from 'ramda'

interface Item {
  created: string
}

const groupByDay = <T extends Item>(items: T[]) => {
  const orderedItems = R.sort(
    R.descend(item => item.created || ''),
    items,
  )

  return R.groupWith((a, b) => isSameDay(new Date(a.created), new Date(b.created)), orderedItems)
}

export default groupByDay
