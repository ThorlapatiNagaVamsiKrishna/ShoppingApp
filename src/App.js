import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item\

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachProduct => {
      if (eachProduct.id !== id) {
        return eachProduct
      }
      return null
    })
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filterCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        let {quantity} = eachItem
        quantity += 1
        return {...eachItem, quantity}
      }
      return eachItem
    })

    this.setState({cartList: filterCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filterCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        let {quantity} = eachItem
        quantity -= 1
        return {...eachItem, quantity}
      }
      return eachItem
    })

    this.setState({cartList: filterCartList})
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  //   TODO: Update the code here to implement addCartItem

  addCartItem = product => {
    const {cartList} = this.state
    const itemValidation = cartList.find(
      eachProduct => eachProduct.id === product.id,
    )
    if (itemValidation === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else if (itemValidation !== undefined) {
      const updatedList = cartList.map(eachItem => {
        if (eachItem.id === itemValidation.id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + product.quantity,
          }
        }
        return eachItem
      })
      this.setState({cartList: updatedList})
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
