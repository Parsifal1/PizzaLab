import React from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary
} from '@material-ui/core';

const Title = styled(Typography)`

`

export default function PanelOption(props) {
    
    return (
        <ExpansionPanel expanded={props.expanded === props.panelName} onChange={props.handleChange(props.panelName)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Title>{props.title}</Title>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <props.panel/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}