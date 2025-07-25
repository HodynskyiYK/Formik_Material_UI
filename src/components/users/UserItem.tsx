import React from 'react';
import type {TUser} from '../../types/users.type.ts'
import {Card, Box, CardActionArea, CardMedia, CardContent, Typography, Grid} from '@mui/material'
import {Link} from 'react-router-dom'

interface IProps {
    user: TUser
}

export const UserItem: React.FC<IProps> = ({user}) => {

    return (
        <Grid size={{ xs: 2, sm: 3, md: 3 }}>
            <Box width={'100%'} mb={3}>
                <Link to={`/user/${user.id}`}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={user.avatar}
                                alt={user.name}
                            />
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
                        </CardActionArea>
                    </Card>
                </Link>
            </Box>
        </Grid>
    );
};
