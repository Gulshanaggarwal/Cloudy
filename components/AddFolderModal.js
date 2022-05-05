import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LocalContext } from '../contexts/LocalContextProvider';
import { useContext, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { ROOT_FOLDER } from '../hooks/useFolder';
import appwrite from '../appwrite/appwrite';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import db from '../firebase/firebase';
import { AddToast } from './resuables/toast';
import { ToastContext } from '../contexts/ToastContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFolderModal({ currentFolder }) {
    const { addFolderModal, dispatch } = useContext(LocalContext);
    const [, toastDispatch] = useContext(ToastContext);

    const [folderName, setFolderName] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    const isUser = useContext(AuthContext);

    const handleClose = () => {
        setError(false);
        return dispatch({
            type: "setFolderModalVisibility",
            payload: false
        })
    }

    const handleCreateFolder = async () => {
        setError(false);
        if (currentFolder === null) return;

        if (folderName.trim() === "") {
            setError(true);
            setErrorMessage("Folder name cannot be empty");
            return;
        }

        const path = currentFolder.path.length === 0 ? [] : [{ ...currentFolder.path }];

        if (currentFolder !== ROOT_FOLDER) {
            path.push({ folderName: currentFolder.folderName, id: currentFolder.id })
        }

        try {
            dispatch({
                type: "setLoader",
                payload: true
            })
            await addDoc(collection(db, "folders"), {
                folderName,
                parentId: currentFolder.id,
                userId: isUser.$id,
                path,
                createdAt: serverTimestamp()
            })
            AddToast("success", "Folder Created Successfully!", toastDispatch);
            dispatch({
                type: "setFolderModalVisibility",
                payload: false
            })
            handleClose();

        } catch (error) {
            AddToast("error", "Error! couldn't create folder", toastDispatch);
        }
        dispatch({
            type: "setLoader",
            payload: false
        })


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
                        variant="filled"
                        size="small"
                        placeholder='Folder Name'
                        onChange={(e) => setFolderName(e.target.value)}
                        error={error}
                        helperText={error ? errorMessage : false}

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