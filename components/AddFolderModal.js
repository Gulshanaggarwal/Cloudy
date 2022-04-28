import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LocalContext } from '../contexts/LocalContextProvider';
import { useContext } from 'react';
import { TextField, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFolderModal() {
    const { addFolderModal, dispatch } = useContext(LocalContext);

    const handleClose = () => {
        dispatch({
            type: "setFolderModalVisibility",
            payload: null
        })
    }

    const handleCreateFolder = () => {

    }


    return (
        <div>
            <Dialog
                open={addFolderModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle>{"Add Folder"}</DialogTitle>
                <DialogContent>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue="Small"
                        variant="filled"
                        size="small"
                        placeholder='Folder Name'

                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCreateFolder}>Create</Button>
                    <Button variant="contained" sx={{
                        backgroundColor: 'grey.700',
                        '&:hover': {
                            backgroundColor: 'grey.800',
                        }
                    }} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}