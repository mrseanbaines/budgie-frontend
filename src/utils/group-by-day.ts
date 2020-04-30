import { isSameDay } from 'date-fns'
import { groupWith } from 'ramda'

interface Item {
  created: string
}

const groupByDay = <T extends Item>(items: T[]) =>
  groupWith((a, b) => isSameDay(new Date(a.created), new Date(b.created)), items)

export default groupByDay
