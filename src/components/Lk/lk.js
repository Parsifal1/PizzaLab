import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux'
import AddItem from './panels/addItem'
import DeleteItem from './panels/deleteItem'
import UpdateItem from './panels/updateItem'
import PanelOption from './panels/panelOption'
import HeaderMenu from '../menu/HeaderMenu'
import UpdateInfo from './panels/updateInfo'

const Options = styled(Container)`
    margin-bottom: 20px;
`

const Background = styled.div`
`

export default function Lk(props) {

    const permission = useSelector(state => state.user.role)

    const [expandedAdmin, setExpandedAdmin] = useState(false)

    const handleChangeAdmin = panel => (event, isExpanded) => {
        setExpandedAdmin(isExpanded ? panel : false);
    };

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
                    panelName={'update_item'}
                    handleChange={handleChange}
                    title={'Изменить данные учетной записи'}
                    panel={UpdateInfo} />
            </Options>
            {permission === 'admin' ? <Options>
                <PanelOption
                    expanded={expandedAdmin}
                    panelName={'add_item'}
                    handleChange={handleChangeAdmin}
                    title={'Добавить позицию'}
                    panel={AddItem} />
                <PanelOption
                    expanded={expandedAdmin}
                    panelName={'update_item'}
                    handleChange={handleChangeAdmin}
                    title={'Изменить позицию'}
                    panel={UpdateItem} />
                <PanelOption
                    expanded={expandedAdmin}
                    panelName={'delete_item'}
                    handleChange={handleChangeAdmin}
                    title={'Удалить позицию'}
                    panel={DeleteItem} />
            </Options> : <div></div>}
        </Background>
    )
}