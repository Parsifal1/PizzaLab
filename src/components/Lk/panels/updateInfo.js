import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import {
    Button,
    Grid,
    Container,
    Avatar
} from '@material-ui/core';
import { TextInput } from '../../Authentication/LoginInput/TextInput'
import { FileInput } from '../../Authentication/LoginInput/FileInput'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Loading } from '../../Loading/Loading'
import Message from '../../ActionsMessages/message'
import { theme } from '../../../Theme/Theme'
import { Password } from "../../Authentication/LoginInput/Password";
import { RadioButtonInput } from '../../Authentication/LoginInput/RadioButtonInput'
import md5 from 'md5'

const SingUpPage = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SingUpForm = styled.form`
    display: inline-flex;
    flex-direction: column;
    width: 600px;
    padding: 30px;
    background: ${theme.background.dark};
    @media (max-width: 600px) {
        width: 300px;
    }
`

const ImageContainer = styled(Grid)`
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled(Avatar)`
    width: 150px;
    height: 150px;
    font-size: 4.0em;
`

const GridForm = styled(Grid)`
    display: inline-flex;
    justify-content: space-around;
`

const ResetButton = styled(Grid)`
    text-align: center;
    margin-top: 20px;
`

const InputsContainer = styled(Grid)`
    margin-bottom: 10px;
`

const SingUpButton = styled(Button)`
    margin: 5px auto 5px auto;
`

export default function UpdateInfo(props) {

    var userInfo = useSelector(state => state.user)

    const [message, setMessage] = useState(null)

    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState(userInfo.avatar)

    const dispatch = useDispatch()

    const handleSubmit = data => {

        if (data.oldPassword) {
            data.password = md5(data.newPassword)
        }

        const user = {
            avatar: data.avatar,
            firstName: data.firstName,
            secondName: data.secondName,
            email: data.email,
            address: data.address,
            phone_number: data.phone_number,
            password: data.password,
            gender: data.gender,
            role: data.role,
        }

        setLoading(true)
        axios
            .post('api/add/user/update', user)
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false)
                    setMessage({
                        text: 'Данные успешно обновлены',
                        type: 'done'
                    })
                    setTimeout(() => { setMessage(null) }, 5000);
                    dispatch({ type: "SET_USER", user: user })
                }
            })
            .catch(error => {
                setLoading(false)
                setMessage({
                    text: 'Ошибка при обновлении данных',
                    type: 'error'
                })
                setTimeout(() => { setMessage(null) }, 5000);
            })
    }


    const getNameAvatar = (first, second) => {
        return Boolean(first) && Boolean(second) ?
            first[0].toUpperCase() + second[0].toUpperCase() : ''
    }

    const validate = (values) => {
        const errors = {}
        if (!values.firstName) {
            errors.firstName = ''
        }
        if (!values.secondName) {
            errors.secondName = ''
        }
        if (!values.email) {
            errors.email = ''
        }
        if (!values.address) {
            errors.address = ''
        }
        if (!values.gender) {
            errors.gender = ''
        }
        if (!values.phone_number) {
            errors.phone_number = ''
        }
        if (values.oldPassword) {
            if (!values.newPassword) {
                errors.newPassword = ''
            } else if (values.confirmNewPassword !== values.newPassword) {
                errors.confirmNewPassword = 'Пароли должны совпадать'
            }
        }
        return errors
    }

    return (
        <div>
            {message ? <Message message={message.text} type={message.type} /> :
                <SingUpPage>
                    {loading ? <Loading /> : <Form
                        initialValues={userInfo}
                        onSubmit={handleSubmit}
                        validate={values => validate(values)}
                        render={({ handleSubmit, reset, submitting, pristine, values, valid }) => (
                            <SingUpForm onSubmit={handleSubmit}>
                                <InputsContainer container spacing={2}>
                                    <Grid container item xs={12} sm={5}>
                                        <ImageContainer item xs={12}>
                                            <Image src={image}>
                                                {getNameAvatar(values.firstName, values.secondName)}
                                            </Image>
                                            <Field name='avatar' defaultValue={null}>
                                                {props => (
                                                    <FileInput
                                                        formats='.png, .jpg, .jpeg'
                                                        text={'Выбрать аватар'}
                                                        image={setImage}
                                                        {...props.input} />
                                                )}
                                            </Field>
                                        </ImageContainer>
                                        <ResetButton item xs={12}>
                                            <Button onClick={() => { setImage(null); values.avatar = null }} variant="contained" color="secondary">
                                                {'Сбросить'}
                                            </Button>
                                        </ResetButton>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field name='firstName'>
                                            {props => (
                                                <TextInput
                                                    disabled={true}
                                                    props={props}
                                                    label={'Имя'}
                                                />)}
                                        </Field>
                                        <Field name='secondName'>
                                            {props => (
                                                <TextInput
                                                    disabled={true}
                                                    props={props}
                                                    label={'Фамилия'}
                                                />)}
                                        </Field>
                                        <Field name='email'>
                                            {props => (
                                                <TextInput
                                                    disabled={true}
                                                    props={props}
                                                    label={'Email'}
                                                />)}
                                        </Field>
                                        <Field name='address'>
                                            {props => (
                                                <TextInput
                                                    props={props}
                                                    label={'Адрес'}
                                                />)}
                                        </Field>
                                        <Field name='phone_number'>
                                            {props => (
                                                <TextInput
                                                    props={props}
                                                    label={'Номер телефона +7XXXXXXXXXX'}
                                                />)}
                                        </Field>
                                    </Grid>
                                    <GridForm container item xs={12} sm={5}>
                                        <Field name="gender">
                                            {props => (<RadioButtonInput type="radio" props={props} values={['Мужской', 'Женский']} />)}
                                        </Field>
                                    </GridForm>
                                    <GridForm container item xs={12} sm={6}>
                                        <Grid item xs={12}>
                                            <Field name='oldPassword'>
                                                {props => (<Password props={props} />)}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name='newPassword'>
                                                {props => (<Password checkPass={userInfo.password} disabled={values.oldPassword ? values.oldPassword : true} props={props} text={'Введите новый пароль'} />)}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name='confirmNewPassword'>
                                                {props => (<Password checkPass={userInfo.password} disabled={values.oldPassword ? values.oldPassword : true} props={props} text={'Повторите новый пароль'} />)}
                                            </Field>
                                        </Grid>
                                    </GridForm>
                                </InputsContainer>
                                <SingUpButton variant="contained" color="primary" type="submit" disabled={!valid}>
                                    {'Обновить данные'}
                                </SingUpButton>
                            </ SingUpForm>
                        )} />}
                </SingUpPage>}
        </div>
    );
}