import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useAppActions} from '../../hooks/useAppAction.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {Loading} from '../common/Loading.tsx'
import {Alert} from '../common/Alert.tsx'
import {UserItem} from './UserItem.tsx'
import {Grid} from '@mui/material'

export const UsersList: React.FC = () => {
    const { fetchUsers } = useAppActions();
    const { users, status, error, deletedUser } = useAppSelector(state => state.users);

    useEffect(() => {
        fetchUsers();
    }, [deletedUser]);

    if (status === 'loading') {
        return <Loading />;
    }

    if (error) {
        return <Alert message={error} severity="error" />;
    }

    return (
        <div>
            <h1>Home</h1>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>{
                users.length ? users.map(user => (
                    <UserItem key={user.id} user={user} />
                )) : <Alert message={'No users found'} severity={'info'} />
            }</Grid>
            <Link to='/add'>Add new user</Link>
        </div>
    );
};
