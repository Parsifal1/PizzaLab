import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useUpdate } from '../../../store/updateStore';
import Message from '../../ActionsMessages/message';
import { Loading } from '../../Loading/Loading';

const DeleteMarkedButton = styled(Button)`
`

export default function DeleteItem() {

    //var items = props.data
    const items = useSelector(state => state.items)

    const [errors, setErrors] = useState({
        error: false,
    })

    const updateItems = useUpdate("ITEMS")

    const [message, setMessage] = useState(null)

    const [loading, setLoading] = useState(false)

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleDelete = () => {

        console.log(checked.length)
        if (checked.length > 1) {
            setLoading(true)
            axios
                .post('/api/item/delete', checked.splice(1))
                .then((response) => {
                    setMessage({
                        text: 'Выбранные позиции удалены',
                        type: 'done'
                    })
                    updateItems()
                    setTimeout(() => { setMessage(null) }, 5000);
                })
                .catch(error => {
                    setLoading(false)
                    setMessage({
                        text: 'Ошибка при удалении позиций',
                        type: 'error'
                    })
                    setTimeout(() => { setMessage(null) }, 5000);
                    setErrors({ ...errors, error: true })
                })
        }
    }

    return (
        message ? <Message message={message.text} type={message.type} /> :
            loading ? <Loading /> : <List>
                <DeleteMarkedButton variant="contained" color="primary" onClick={handleDelete}>{'Удалить выбранные'}</DeleteMarkedButton>
                {items.map(value => {
                    const labelId = `${value.id}`;

                    return (
                        <ListItem key={value.id} dense button onClick={handleToggle(value.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={value.id} primary={`${value.name} | ${value.cost}₽`} />
                        </ListItem>
                    );
                })}
            </List>
    )
}