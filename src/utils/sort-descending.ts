import { Transaction } from 'types'

const sortDesc = ({ created: a }: Transaction, { created: b }: Transaction) => {
  if (a < b) {
    return 1
  }

  if (a > b) {
    return -1
  }

  return 0
}

export default sortDesc
