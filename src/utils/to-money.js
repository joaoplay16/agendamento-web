function toMoney (value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
  // return Number(value).toLocaleString('pt-br', {
  //   style: 'currency',
  //   currency: 'BRL'
  // })
}

export default toMoney
