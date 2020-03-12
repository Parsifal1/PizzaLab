import React, { useState, useEffect } from 'react';
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

export default function Search({ handleSearch }) {

    const handleChange = (value) => {
        handleSearch(value.target.value)
    }

    return (
        <Background>
            <SearchInput
                onChange={handleChange}
                fullWidth
                placeholder={'Поиск'} />
        </Background>
    )
}