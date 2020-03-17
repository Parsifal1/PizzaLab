import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Login from './components/Authentication/Login'
import Home from './components/mainPage/Home'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl, requestSocketUrl } from './config'
import Cart from './components/cart/cart'
import axios from 'axios'
import Auth from './components/Authentication/Auth'
import SingUp from './components/Authentication/SingUp'
import Lk from './components/Lk/lk'
import Requests from './components/Requests/requests'
import { RequestSocket } from './components/Sockets/sockets'

axios.defaults.baseURL = serverUrl
axios.defaults.headers.post['Content-Type'] = 'application/JSON';
axios.defaults.headers.get['Content-Type'] = 'application/JSON';
axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          user ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/auth/login",
                }}
              />
            )
        }
      />
    );
  }

  const cart = useSelector(state => state.cart)

  const cartCount = useSelector(state => state.itemsAmount)

  const requestCount = useSelector(state => state.requestCount)


  useEffect(() => {
    user && axios
      .post('/api/cart/save', cart)
      .then((response) => {
        if (response.status === 200) {
          console.log('Cart saved')
        }
      })
      .catch(error => {
        console.log('Cart save error', error)
      })
  }, [cartCount])

  useEffect(() => {
    if (user)
      RequestSocket.connect()
    else
      RequestSocket.disconnect()
  }, [user !== null])

  useEffect(() => {
    axios
      .get('/api/user/info')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SET_USER", user: response.data })
          if (response.data.cart.length) {
            dispatch({ type: "SET_CART", cart: response.data.cart })
          }
        }
      })
      .catch(error => {
        console.log('User not logged in', error)
      })
    RequestSocket.on('updated', () => {
      axios
        .get(`/api/requests/getCount`)
        .then(response => {
          console.log(response.data)
          dispatch({ type: "SET_REQUEST_COUNT", requestCount: response.data })
        })
    })
    axios
      .get(`/api/requests/getCount`)
      .then(response => {
        dispatch({ type: "SET_REQUEST_COUNT", requestCount: response.data })
      })
  }, [])

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/auth" component={Auth} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/registration" component={SingUp} />
      <PrivateRoute path="/lk">
        <Lk />
      </PrivateRoute>
      <PrivateRoute path="/requests">
        <Requests />
      </PrivateRoute>
    </Router>
  );
}

export default App;