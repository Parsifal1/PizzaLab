import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container } from '@material-ui/core';
import CartItem from './cartItem'
import { Loading } from '../Loading/Loading'
import Message from '../ActionsMessages/message'
import axios from 'axios'

const Background = styled(Container)`
    padding: none;
`

const ConfirmButton = styled(Button)`
    && {
        display: block;
        width: 50vw;
        margin: auto auto 50px auto;
    }
`

export default function ItemList(props) {

    const isLogin = useSelector(state => state.user)

    const cartItems = useSelector(state => state.cart)

    const [totalCost, setTotalCost] = useState()

    const dispatch = useDispatch()

    const [message, setMessage] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleConfirmCart = () => {
        setLoading(true)
        axios
            .post('/api/cart/confirm', cartItems)
            .then((response) => {
                setLoading(false)
                setMessage({
                    text: `Заказ получен, ожидайте звонка на номер ${isLogin.phone_number}`,
                    type: 'done'
                })
                dispatch({ type: "SET_CART", cart: [] })
                setTimeout(() => { setMessage(null) }, 5000);
            })
            .catch(error => {
                setLoading(false)
                setMessage({
                    text: 'Ошибка при подтверждении заказа, пропробуйте еще раз',
                    type: 'error'
                })
                setTimeout(() => { setMessage(null) }, 5000);
            })
    }

    const getTotalCost = () => {
        if (cartItems) {
            var totalCost = 0;
            cartItems.forEach(item => {
                totalCost += item.cost * item.count
            });
            setTotalCost(totalCost)
        } else setTotalCost(0)
    }

    return (
        message ? <Message message={message.text} type={message.type} /> :
            loading ? <Loading /> : <Background>
                {cartItems.length ? <ConfirmButton onClick={handleConfirmCart} disabled={!isLogin} variant="contained" color="primary">
                    {`Сделать заказ | ${totalCost}₽`}
                </ConfirmButton> : <div></div>}
                {cartItems.length ? cartItems.map(item => {
                    return <CartItem changeTotalCost={getTotalCost} key={item.id} item={item} />
                }) : <div>Пусто</div>
                }
            </Background>
    )
}