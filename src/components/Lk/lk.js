import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Button,
    Typography,
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary
} from '@material-ui/core';
import AddItem from './panels/addItem'
import PanelOption from './panels/panelOption'
import HeaderMenu from '../menu/HeaderMenu'

const Options = styled(Container)`
`

const Title = styled(Typography)`
`

const Background = styled.div`
`

export default function Lk(props) {

    const [expanded, setExpanded] = useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Background>
            <HeaderMenu />
            <Options>
                <PanelOption
                    expanded={expanded}
                    panelName={'add_item'}
                    handleChange={handleChange}
                    title={'Добавить позицию'}
                    panel={AddItem} />
                <PanelOption
                    expanded={expanded}
                    panelName={'update_item'}
                    handleChange={handleChange}
                    title={'Изменить позицию'}
                    panel={AddItem} />
                <PanelOption
                    expanded={expanded}
                    panelName={'delete_item'}
                    handleChange={handleChange}
                    title={'Удалить позицию'}
                    panel={AddItem} />
            </Options>
        </Background>
    )
}