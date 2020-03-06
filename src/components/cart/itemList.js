import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Button, Container } from '@material-ui/core';
import CartItem from './cartItem'

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

    const cartItems = useSelector(state => state.cart)

    const [totalCost, setTotalCost] = useState()

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
        <Background>
            {cartItems.length ? <ConfirmButton variant="contained" color="primary">{`Сделать заказ | ${totalCost}₽`}</ConfirmButton> : <div></div>}
            {cartItems.length ? cartItems.map(item => { return <CartItem changeTotalCost={getTotalCost} key={item.id} item={item} /> }) : <div>Пусто</div>}
        </Background>
    )
}