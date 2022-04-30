function pathStartWith (first, second) {
  const er = new RegExp(`^${first}`, 'ig')
  return second.search(er) > -1
}

export default pathStartWith
