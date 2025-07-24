import React from "react";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {TextField, FormLabel, Button} from "@mui/material";
import {useAppActions} from '../../hooks/useAppAction.ts'
import {phoneRegExp} from '../../constants/regularExpression.ts'
import type {TUser} from '../../types/users.type.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {LoadingState} from '../../types/common.type.ts'
import {Alert} from '../common/Alert.tsx'

const FormSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is required'),
    email: Yup.string()
        .email('Not a valid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Not a valid phone number')
        .required('Phone number is required'),

})

interface IResponse {
    meta: {
        requestStatus: string
    },
    package: TUser
}

export const AddNewUser: React.FC = () => {
    const navigate = useNavigate();
    const { createNewUser } = useAppActions()
    const {error, status} = useAppSelector(state => state.users)
    const isLoading = status === LoadingState.LOADING


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validationSchema: FormSchema,
        onSubmit: async (values, { resetForm }) => {
            const response: any = await createNewUser(values);
            resetForm()
            if (response.meta.requestStatus === 'fulfilled') {
                navigate('/')
            }
        }
    })

    const handlerCancel = () => {
        formik.resetForm()
        navigate('/')
    }

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                style={{'marginBottom': '1rem'}}
            >
                <FormLabel>
                    <TextField
                        fullWidth={true}
                        label="Name"
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        disabled={isLoading}
                    />
                </FormLabel>
                <FormLabel>
                    <TextField
                        fullWidth={true}
                        label="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        disabled={isLoading}
                    />
                </FormLabel>
                <FormLabel>
                    <TextField
                        fullWidth={true}
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        disabled={isLoading}
                    />
                </FormLabel>
                <div>
                    <Button
                        color="primary"
                        type="submit"
                        fullWidth={true}
                        variant="contained"
                        loading={isLoading}
                    >Create New User</Button>
                </div>
            </form>
            {
                error && (
                    <Alert
                        message={error.toString()}
                        severity={'error'}
                    />
                )
            }
            <Button
                variant="contained"
                color="info"
                onClick={handlerCancel}
            >Cansel</Button>
        </>
    )
}
