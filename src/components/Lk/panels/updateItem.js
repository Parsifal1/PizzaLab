import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddItem from './addItem'
import { useSelector } from 'react-redux'

const Item = styled(ListItem)`
    height: 60px;
`

const BackButton = styled(Button)`
    margin: 0px 0px 20px 0px;
`

export default function UpdateItem() {

    //var items = props.data
    const items = useSelector(state => state.items)

    const [loading, setLoading] = useState(false)

    const [selected, setSelected] = useState(false);

    const handleUpdate = (item) => {

        setSelected({
            avatar: `data:image/${item.type};base64,${item.data}`,
            name: item.name,
            recipe: item.recipe.join(','),
            cost: item.cost
        })
    }

    return (
        selected ? <div>
            <BackButton disabled={loading} variant="contained" color="primary" onClick={() => { setSelected(false) }}>Назад</BackButton>
            <AddItem updateLoading={setLoading} update data={selected} BackButton />
        </div> : <List>
                {items.map(value => {
                    return (
                        <Item key={value.id} dense button>
                            <ListItemText id={value.id} primary={`${value.name} | ${value.cost}₽`} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => handleUpdate(value)} edge="end" aria-label="comments">
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </Item>
                    );
                })}
            </List>
    )
}