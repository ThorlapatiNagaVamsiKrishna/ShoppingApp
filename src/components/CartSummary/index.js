import './index.css'

const CartSummary = props => {
  const {cartList} = props
  let totalCartBill = 0
  cartList.forEach(eachProduct => {
    totalCartBill += eachProduct.quantity * eachProduct.price
  })
  return (
    <div className="summary-container">
      <h1 className="summary-heading">
        Order Total: <span className="total-bill">RS {totalCartBill}/-</span>
      </h1>
      <p className="item-length">{cartList.length} Items in cart</p>
      <button type="button" className="checkout-button">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
