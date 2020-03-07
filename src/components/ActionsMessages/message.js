import React from 'react';
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import Icons from '@material-ui/core/Icon'
import { theme } from '../../Theme/Theme'

const Background = styled.div`
    margin: 25px 0px 0px 0px;
    padding: 35px 10px 15px 10px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    border-radius: 10px;
    ${({ type }) => type && `
        color: ${theme[type].main}
        border: ${theme[type].main} 2px solid;
    `}
`

const Title = styled(Typography)`
    font-size: 14pt;
    color: inherit;
`

const Icon = styled(Icons)`
    color: inherit;
    position: absolute;
    font-size: 40pt;
    top: -25px;
    z-index: 1;
`

const IconBackGround = styled.div`
    position: absolute;
    width: 46px;
    height: 46px;
    background: white;
    top: -22px;
    z-index: 0;
`

export default function Message(props) {
    return (
        <Background type={props.type}>
            <Icon>{props.type}</Icon>
            <IconBackGround/>
            <Title>
                {props.message ? props.message : "Ошибка"}
            </Title>
        </Background>
    )
}