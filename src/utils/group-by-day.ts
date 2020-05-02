import { isSameDay } from 'date-fns'
import * as R from 'ramda'

interface Item {
  created: string
}

const groupByDay = <T extends Item>(items: T[]) =>
  R.groupWith((a, b) => isSameDay(new Date(a.created), new Date(b.created)), items)

export default groupByDay
