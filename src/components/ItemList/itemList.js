import React from 'react'
import styled from 'styled-components'
import { Container } from '@material-ui/core';
import ItemCard from './itemCard'
import { Loading } from '../Loading/Loading'

const Background = styled(Container)`
    padding: none;
    display: flex;
    flex-wrap: wrap;
`

export default function ItemList({ data }) {
    return (
        <Background>
            {data.length ? data.map(item => { return <ItemCard key={item.id} data={item} /> }) : <Loading />}
        </Background>
    )
}