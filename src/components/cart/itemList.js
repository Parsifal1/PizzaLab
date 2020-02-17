import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Button, Typography, Container, Avatar } from '@material-ui/core';
import CartItem from './cartItem'

const Background = styled(Container)`
    padding: none;
`

export default function ItemList(props) {

    const cartItems = useSelector(state => state.cart)

    const [items, setItems] = useState()

    return (
        <Background>
            {cartItems.length ? cartItems.map( item => {return <CartItem item={item}/>}) : <div>Пусто</div>}
        </Background>
    )
}
