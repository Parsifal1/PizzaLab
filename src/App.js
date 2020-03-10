import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from './components/Authentication/Login'
import Home from './components/mainPage/Home'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from './config'
import Cart from './components/cart/cart'
import axios from 'axios'
import Auth from './components/Authentication/Auth'
import SingUp from './components/Authentication/SingUp'
import Lk from './components/Lk/lk'
import { Store } from '@material-ui/icons';

axios.defaults.baseURL = serverUrl
axios.defaults.headers.post['Content-Type'] = 'application/JSON';
axios.defaults.headers.get['Content-Type'] = 'application/JSON';
axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch()


  useEffect(() => {
    axios
      .post('/api/pizza/get/page/1')
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SET_ITEMS", items: response.data })
        }
      })
  })

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/auth" component={Auth} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/registration" component={SingUp} />
      <Route path="/lk" component={Lk} />
    </Router>
  );
}
export default App;