import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { Button, Avatar, Container } from '@material-ui/core';
import { TextInput } from '../../Authentication/LoginInput/TextInput'
import { FileInput } from '../panels/extra/FileInput'
import axios from 'axios'
import { Loading } from '../../Loading/Loading'
import Message from '../../ActionsMessages/message'


const AddItemForm = styled.form`
`

const SubmitButton = styled(Button)`
`

const ImageField = styled(Container)`
    display: flex;
    width: 300px;
    height: 200px;
`

const ImageInput = styled(FileInput)`
    && {
        border-radius: 0px;
    }
`

const Image = styled(Avatar)`
    border-radius: 0px;
    width: 300px;
    height: 200px;
    font-size: 4.0em;
`

export default function AddItem(props) {

    const [errors, setErrors] = useState({
        error: false,
    })

    const [message, setMessage] = useState(null)

    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState(props.data ? props.data.avatar : null)

    const handleSubmit = data => {
        console.log(data)
        data.recipe = data.recipe.split(/[,.|:;]+/).map(item => item.trim())
        setLoading(true)
        if (props.update) {
            props.updateLoading(true)
            axios
                .post('/api/item/update', data)
                .then((response) => {
                    setMessage({
                        text: 'Позиция успешно обновлена',
                        type: 'done'
                    })
                    props.updateLoading(false)
                    setTimeout(() => { setMessage(null) }, 5000);
                })
                .catch(error => {
                    setLoading(false)
                    setMessage({
                        text: 'Ошибка при обновлении позиции',
                        type: 'error'
                    })
                    props.updateLoading(false)
                    setTimeout(() => { setMessage(null) }, 5000);
                    setErrors({ ...errors, error: true })
                })
        } else {
            axios
                .post('/api/item/add', data)
                .then((response) => {
                    setMessage({
                        text: 'Позиция успешно добавлена',
                        type: 'done'
                    })
                    setTimeout(() => { setMessage(null) }, 5000);
                })
                .catch(error => {
                    setLoading(false)
                    setMessage({
                        text: 'Ошибка при добавлении позиции',
                        type: 'error'
                    })
                    setTimeout(() => { setMessage(null) }, 5000);
                    setErrors({ ...errors, error: true })
                })
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.name) {
            errors.firstName = ''
        }
        if (!values.recipe) {
            errors.password = ''
        }
        if (!values.cost) {
            errors.password = ''
        }
        if (!values.avatar) {
            errors.avatar = ''
        }
        return errors
    }

    return (
        message ? <Message message={message.text} type={message.type} /> :
            loading ? <Loading /> : <Form
                onSubmit={handleSubmit}
                validate={values => validate(values)}
                initialValues={props.data}
                render={({ handleSubmit, reset, submitting, pristine, values, valid }) => (
                    <AddItemForm onSubmit={handleSubmit}>
                        <ImageField>
                            <Image src={image}></Image>
                            <Field name='avatar' defaultValue={null}>
                                {props => (
                                    <ImageInput
                                        formats='.png, .jpg, .jpeg'
                                        text={'Загрузить изображение'}
                                        image={setImage}
                                        {...props.input} />
                                )}
                            </Field>
                        </ImageField>
                        <Field name='name'>
                            {props => (
                                <TextInput
                                    props={props}
                                    error={errors.error}
                                    label={'Название позиции'}
                                />)}
                        </Field>
                        <Field name='recipe'>
                            {props => (
                                <TextInput
                                    props={props}
                                    error={errors.error}
                                    label={'Рецепт'}
                                />)}
                        </Field>
                        <Field name='cost'>
                            {props => (
                                <TextInput
                                    props={props}
                                    error={errors.error}
                                    label={'Стоимость'}
                                />)}
                        </Field>
                        <SubmitButton variant="contained" color="primary" type="submit" disabled={!valid}>
                            {'Добавить'}
                        </SubmitButton>
                    </AddItemForm>
                )} />
    )
}