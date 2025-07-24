import React from "react";
import { useFormik } from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {TextField, FormLabel, Button, CircularProgress, Box} from "@mui/material";
import {useAppActions} from '../../hooks/useAppAction.ts'
import {phoneRegExp} from '../../constants/regularExpression.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {LoadingState, type IResponse} from '../../types/common.type.ts'
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const response: IResponse = await createNewUser(values);
            resetForm()
            if (response?.meta?.requestStatus === 'fulfilled') {
                navigate('/')
            }
        }
    })

    const handlerCancel = () => {
        if (formik.dirty && !window.confirm('Are you sure you want to cancel?')) {
            return;
        }
        formik.resetForm();
        navigate('/');
    }

    return (
        <>
            <Box mb={4}>
                <form onSubmit={formik.handleSubmit}>
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
                        >{
                            isLoading ? <CircularProgress size={24} /> : 'Create New User'
                        }</Button>
                    </div>
                </form>
            </Box>
            {
                error && (
                    <Alert
                        message={typeof error === 'string' ? error : 'An unexpected error occurred'}
                        severity={'error'}
                    />
                )
            }
            <Button
                variant="contained"
                color="info"
                onClick={handlerCancel}
            >Cancel</Button>
        </>
    )
}
