import React, { useState } from 'react';
import styled from 'styled-components'
import { Container, InputBase } from '@material-ui/core';
import { theme } from '../../Theme/Theme'

const Background = styled(Container)`
    background: ${theme.secondary.main};
    width: 50vw;
    margin: 30px auto 30px auto;
    padding: 5px 20px 5px 20px;
    border-radius: 10px;
`

const SearchInput = styled(InputBase)`
    color: #ffffff;
    font-size: 1.3rem;
`

export default function Search({ data = [], setResult }) {

    const [value, setValue] = useState('')

    const items = data

    const handleChange = (value) => {
        setValue(value.target.value)
        setResult(GetResults(value.target.value.trim()))
    }

    const GetResults = (value) => {
        var itemList = []
        items.forEach(element => {
            if (element.name.toLowerCase().search(new RegExp(`${value.toLowerCase().split(/[ -]/).join('.')}`)) !== -1) {
                itemList.push(element)
            }
        })
        return itemList
    }

    return (
        <Background>
            <SearchInput
                value={value}
                onChange={handleChange}
                fullWidth
                placeholder={'Поиск'} />
        </Background>
    )
}