import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogTitle, Popover, Typography} from '@mui/material'
import {useAppActions} from '../../hooks/useAppAction.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {useLocation, useNavigate} from 'react-router-dom';

interface IProps {
    id: string
}

export const DeleteUser: React.FC<IProps> = ({id}) => {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [showPopover, setShowPopover] = useState<boolean>(false)
    const {users} = useAppSelector(state => state.users);
    const {deleteUser} = useAppActions()
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const handleDelete = () => {
        setShowDialog(false)
        setShowPopover(true)
        setTimeout(async () => {
            setShowPopover(false)
            await deleteUser(Number(id))
            if (pathname !== '/') {
                navigate('/')
            }
        }, 3000)
    }

    return (
        <>
            <Button
                color={'error'}
                size={'small'}
                onClick={() => setShowDialog(true)}
            >Delete</Button>
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
                    {`User ${users.find(user => user.id === id)?.name} was successfully deleted.`}
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
