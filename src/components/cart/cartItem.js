import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Typography, Container, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import Icons from '@material-ui/core/Icon'
import axios from 'axios'

const Background = styled(Container)`
    padding: unset;
    width: 350px;
    margin: initial;
    padding: 0px;
    margin: initial;
    &:hover {
        cursor: pointer;
    }
    margin: 0px 15px 15px 0px;
`

const Image = styled(Avatar)`
    width: fit-content;
    height: 250px;
    border-radius: 0px;
`

const Title = styled(Typography)`
    padding: 5px 0px 0px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 1.3rem;
`

const Recipe = styled(Typography)`
    font-size: 0.9rem;
`

const RemoveFromCart = styled(Button)`
    && {
        display: flex;
        margin: auto;
        width: 300px;
        color: white;
        margin: 10px auto 10px auto;
    }
`

const Info = styled(Container)`
    padding: 0px 10px 5px 10px;
`

export default function CartItem(props) {

    const data = props.item

    const [totalCount, setTotalCount] = useState(data.count)

    const [totalCost, setTotalCost] = useState(data.count * data.cost)

    const [delCount, setDelCount] = useState(1)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)


    const handleCartChange = () => {
        var currentCart = cart

        var item = currentCart.indexOf(currentCart.find((item) => item.id === data.id))

        if (delCount >= currentCart[item].count) {
            if (currentCart.length < 2) {
                currentCart = []
            } else {
                currentCart.splice(item, 1)
                setTotalCount(0)
            }
        } else {
            currentCart[item].count -= delCount
            setTotalCount(currentCart[item].count)
            setTotalCost(currentCart[item].count * currentCart[item].cost)
        }
        dispatch({ type: "SET_CART", cart: currentCart })
    }

    const makeRecipe = () => {
        if (data.recipe) {
            var finalRecipe = ''
            data.recipe.forEach(element => {
                finalRecipe += element + ', '
            });
            return finalRecipe.slice(0, finalRecipe.length - 2)
        } else return ''
    }

    return (
        totalCount ? <Background>
            <Image src={`data:image/${data.type};base64, ${data.data}`} />
            <Info>
                <Title>
                    {data.name}
                </Title>
                <Recipe>{`Состав: ${makeRecipe()}`}</Recipe>
                <RemoveFromCart onClick={handleCartChange} variant="contained" color="primary">
                    {`Убрать | ${totalCost}₽ | ${totalCount}`}
                </RemoveFromCart>
            </Info>
        </Background> : null
    )
}