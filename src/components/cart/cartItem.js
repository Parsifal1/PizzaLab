import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Typography, Container, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import Icons from '@material-ui/core/Icon'
import axios from 'axios'

const Background = styled(Container)`
    padding: unset;
    padding: 0px;
    display: flex;
    &:hover {
        cursor: pointer;
    }
    margin: 0px 15px 15px 0px;
`

const Image = styled(Avatar)`
    width: fit-content;
    height: 200px;
    width: 300px;
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

const CountInfo = styled(Button)`
    && {
        border-radius: 0px;
        display: flex;
        margin: auto;
        height: 50px;
        width: 150px;
        color: white;
        border-radius: 0px;
    }
`

const DelteItem = styled(Button)`
    && {
        height: 50px;
        border-radius: 15px;
        width: 20px;
        border-bottom-right-radius: 0px;
        border-top-right-radius: 0px;
    }
`

const AddItem = styled(Button)`
    && {
        height: 50px;
        border-radius: 15px;
        width: 20px;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
    }
`

const Info = styled(Container)`
    padding: 0px 10px 5px 10px;
`

const ChangeCount = styled(Container)`
    display: flex;
    align-items: center;
    width: fit-content;
`

export default function CartItem(props) {

    const data = props.item

    const [totalCount, setTotalCount] = useState(data.count)

    const [totalCost, setTotalCost] = useState(data.count * data.cost)

    const [delCount, setDelCount] = useState(1)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    props.changeTotalCost()

    const handleCartChange = (action) => {
        var currentCart = cart

        var item = currentCart.indexOf(currentCart.find((item) => item.id === data.id))

        if (action === '-') {
            if (delCount >= currentCart[item].count) {
                if (currentCart.length < 2) {
                    currentCart = []
                } else {
                    currentCart.splice(item, 1)
                    setTotalCount(0)
                }
            } else {
                currentCart[item].count -= 1
                setTotalCount(currentCart[item].count)
                setTotalCost(currentCart[item].count * currentCart[item].cost)
            }
        } else {
                currentCart[item].count += 1
                setTotalCount(currentCart[item].count)
                setTotalCost(currentCart[item].count * currentCart[item].cost)
        }
        dispatch({ type: "SET_CART", cart: currentCart })
        props.changeTotalCost()
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
            </Info>
            <ChangeCount>
                <DelteItem onClick={() => { handleCartChange('-') }} variant="contained" color="primary">-</DelteItem>
                <CountInfo variant="contained" color="primary">
                    {`${totalCost}₽ | ${totalCount}`}
                </CountInfo>
                <AddItem onClick={() => { handleCartChange('+') }} variant="contained" color="primary">+</AddItem>
            </ChangeCount>
        </Background> : null
    )
}