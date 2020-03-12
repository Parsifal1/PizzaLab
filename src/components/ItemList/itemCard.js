import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Typography, Container, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'

const onItemHover = keyframes`
    from {
        box-shadow: unset;
        transform: translate(0px, 0px);
    }

    to {
        box-shadow: -7px 11px 9px 0px #000000c7;
        transform: translate(5px, -5px);
    }
`

const afterItemHover = keyframes`
    from {
        box-shadow: -7px 11px 9px 0px #000000c7;
        transform: translate(5px, -5px);
    }

    to {
        box-shadow: unset;
        transform: translate(0px, 0px);
    }
`

const Background = styled(Container)`
    padding: unset;
    width: 350px;
    margin: initial;
    padding: 0px;
    margin: initial;
    &:hover {
        cursor: pointer;
        animation: ${onItemHover} 0.1s normal ease-in-out;
        box-shadow: -7px 11px 9px 0px #000000c7;
        transform: translate(5px, -5px);
    }
    animation: ${afterItemHover} 0.1s ease-in-out;
    margin: 0px 15px 15px 0px;
`

const Image = styled(Avatar)`
    width: 350px;
    height: 350px;
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

const AddToCart = styled(Button)`
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

export default function BookCard(props) {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    var data = props.data

    const handleCartChange = () => {
        var curCart = cart

        const item = curCart.indexOf(curCart.find((item) => item.id === data.id))

        if (item !== -1) {
            curCart[item].count++
        } else {
            data.count = 1
            curCart = [data, ...curCart]
        }

        dispatch({ type: "SET_CART", cart: curCart })
    }

    return (
        <Background key={data.id}>
            <Image src={`data:image/${data.type};base64, ${data.data}`} />
            <Info>
                <Title>
                    {data.name}
                </Title>
                <Recipe>{`Состав: ${MakeRecipe(data.recipe)}`}</Recipe>
                <AddToCart onClick={handleCartChange} variant="contained" color="primary">{`В корзину | ${data.cost}₽`}</AddToCart>
            </Info>
        </Background>
    )
}

function MakeRecipe(recipe) {
    var finalRecipe = ''
    recipe.forEach(element => {
        finalRecipe += element + ', '
    });
    return finalRecipe.slice(0, finalRecipe.length - 2)
}