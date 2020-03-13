import axios from 'axios'
import { useDispatch } from 'react-redux'


export function useUpdate(type) {
    const dispatch = useDispatch()

    const items = () =>
        axios
            .post('/api/pizza/get/page/1')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_ITEMS", items: response.data })
                }
            })
            .catch(error => {
                console.log(error)
            })

    const user = () =>
        axios
            .get('/api/user/info')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_USER", user: response.data })
                }
            })
            .catch(error => {
                console.log('User not logged in')
            })

    const cart = () =>
        axios
            .get('/api/user/cart')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_USER", user: response.data })
                }
            })
            .catch(error => {
                console.log('User not logged in')
            })

    switch (type) {
        case 'ITEMS':
            return items
        case 'USER':
            return user
        case 'CART':
            return cart
        default:
            return false
    }
}
