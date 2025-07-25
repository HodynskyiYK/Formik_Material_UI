import React, {useEffect} from "react";
import {useAppActions} from '../hooks/useAppAction.ts'
import {useParams} from 'react-router-dom'
import {useAppSelector} from '../hooks/useAppSelector.ts'
import {LoadingState} from '../types/common.type.ts'
import {Loading} from '../components/common/Loading.tsx'
import {Alert} from '../components/common/Alert.tsx'
import {UserItem} from '../components/users/UserItem.tsx'
import {Grid} from '@mui/material'
import {UserForm} from '../components/forms/UserForm.tsx'

const UserPage: React.FC = () => {
    const {id} = useParams()
    const {userById, status, error} = useAppSelector(state => state.users)
    const {fetchUserById} = useAppActions()
    const isLoading = status === LoadingState.LOADING

    useEffect(() => {
        if (id) {
            fetchUserById(Number(id))
        }
    }, [id]);

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (error) {
        return (
            <Alert message={error} severity={'error'}/>
        )
    }

    if (userById === null) {
        return (
            <Alert message={`User by ${id} not found`} severity={'info'}/>
        )
    }

    return (
        <>

            <h1>User Page</h1>
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <UserItem user={userById}/>
            </Grid>
            <UserForm user={userById} />
        </>
    );
};

export default UserPage;
