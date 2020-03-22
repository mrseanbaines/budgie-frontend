const formatCurrency = (amount: number) => {
  const prefix = amount > 0 ? '+ ' : ''

  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Math.abs(amount / 100))

  return prefix.concat(formatted)
}

export default formatCurrency
