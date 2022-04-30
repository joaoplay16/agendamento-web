import { useContext } from 'react'
import { ShoppingCartContext } from 'contexts'

function useShoppingCart () {
  return useContext(ShoppingCartContext)
}

export default useShoppingCart
