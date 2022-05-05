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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFolderModal({ currentFolder }) {
    const { addFolderModal, dispatch } = useContext(LocalContext);
    const [folderName, setFolderName] = useState("");

    const isUser = useContext(AuthContext);

    const handleClose = () => {
        dispatch({
            type: "setFolderModalVisibility",
            payload: false
        })
    }

    const handleCreateFolder = async () => {
        if (currentFolder === null) return;

        if (folderName.trim() === "") {
            alert("Enter a valid folder name");
        }

        const path = currentFolder.path.length === 0 ? [] : [{ ...currentFolder.path }];

        if (currentFolder !== ROOT_FOLDER) {
            path.push({ folderName: currentFolder.folderName, id: currentFolder.id })
        }

        try {
            console.log(currentFolder);
            await addDoc(collection(db, "folders"), {
                folderName,
                parentId: currentFolder.id,
                userId: isUser.$id,
                path,
                createdAt: serverTimestamp()
            })
            alert("success");
            handleClose();

        } catch (error) {
            console.log(error);
            alert("couldn't create a folder")
        }


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
                        onChange={(e) => setFolderName(e.target.value)}

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