import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { Button, Avatar, Container } from '@material-ui/core';
import { TextInput } from '../../Authentication/LoginInput/TextInput'
import { FileInput } from '../panels/extra/FileInput'

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

    const [image, setImage] = useState(null)

    const handleSubmit = data => {
        /* setLoading(true)
        axios
            .post('/api/login', data)
            .then((response) => {
                if (response.status === 200) {
                    axios
                        .get('/api/user/info')
                        .then((response) => {
                            if (response.status === 200) {
                                setLoading(false)
                                dispatch({ type: "SET_USER", user: response.data })
                                const user = response.data
                                console.log(user)
                            }
                        })
                        .catch((error) => {
                            setLoading(false)
                            setErrors({ ...errors, error: true })
                        })
                }
            })
            .catch(error => {
                setLoading(false)
                setErrors({ ...errors, error: true })
            }) */
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
        <Form
            onSubmit={handleSubmit}
            validate={values => validate(values)}
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