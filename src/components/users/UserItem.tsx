import React from 'react';
import type {TUser} from '../../types/users.type.ts'
import {
    Card,
    Box,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    CardActions
} from '@mui/material'
import {Link} from 'react-router-dom'
import {DeleteUser} from '../common/DeleteUser.tsx'

interface IProps {
    user: TUser
}

export const UserItem: React.FC<IProps> = ({user}) => {

    return (
        <>
            <Grid size={{ xs: 2, sm: 3, md: 3 }}>
                <Box width={'100%'} mb={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <div>
                            <Link to={`/user/${user.id}`}>
                                <CardMedia
                                    component="img"
                                    image={user.avatar}
                                    alt={user.name}
                                />
                            </Link>
                            <Link to={`/user/${user.id}`}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {user.name}
                                    </Typography>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        {user.phone}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {user.email}
                                    </Typography>
                                </CardContent>
                            </Link>
                            <CardActions>
                                <DeleteUser id={user.id} />
                            </CardActions>
                        </div>
                    </Card>
                </Box>
            </Grid>
        </>
    );
};
