import React, {useMemo, useState} from 'react';
import {Button, CircularProgress, Dialog, DialogActions, DialogTitle, Popover, Typography} from '@mui/material'
import {useAppActions} from '../../hooks/useAppAction.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {useLocation, useNavigate} from 'react-router-dom';

interface IProps {
    id: string
}

export const DeleteUser: React.FC<IProps> = ({id}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const {users} = useAppSelector(state => state.users);
    const {deleteUser, removeUser} = useAppActions()
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const handleDelete = async () => {
    setLoading(true);
    setShowDialog(false);
    setShowPopover(true);

    // Wait for 2 seconds before proceeding
    setTimeout(async () => {
        try {
            await deleteUser(Number(id));
            removeUser(Number(id)); // Remove user from store
            setLoading(false);
            if (pathname !== '/') {
                navigate('/');
            }
        } finally {
            setShowPopover(false);
            setLoading(false);
        }
    }, 1000);
};

    const userName = useMemo(() => {
        return users.find(user => user.id === id)?.name || 'Unknown user';
    }, [])

    return (
        <>
            <Button
                color={'error'}
                size={'small'}
                onClick={() => setShowDialog(true)}
            >{loading ? <CircularProgress size={24} /> : 'Delete'}</Button>
            <Popover
                id={id}
                open={showPopover}
                onClose={() => setShowPopover(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                    {`User ${userName} was successfully deleted.`}
                </Typography>
            </Popover>
            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete the user?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowDialog(false)}>Disagree</Button>
                    <Button onClick={handleDelete} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
