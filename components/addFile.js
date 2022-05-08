import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState, useContext } from "react";
import { ToastContext } from "../contexts/ToastContext"
import { AddToast } from "../components/resuables/toast"
import appwrite from "../appwrite/appwrite"
import db from "../firebase/firebase"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from "../contexts/AuthContext";

const Input = styled('input')({
    display: 'none',
});

const supportedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
const MAX_FILE_SIZE = 10485760   // 10bytes;

export default function AddFile({ currentFolder }) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [, toastDispatch] = useContext(ToastContext);
    const isUser = useContext(AuthContext);

    const handleFileCapture = (e) => {

        let files = [];
        let count = 0;

        while (count < e.target.files.length) {
            if (supportedFileTypes.includes(e.target.files[count].type) && e.target.files[count].size <= MAX_FILE_SIZE) {
                files.push(e.target.files[count]);
            }
            else {
                AddToast("error", `${e.target.files[count].name} not supported`, toastDispatch)
                return;
            }
            count++;
        }

        files.forEach(async (file) => {
            try {
                const response = await appwrite.storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKETID, 'unique()', file);
                await addDoc(collection(db, "files"), {
                    fileName: file.name,
                    fileId: response.$id,
                    userId: isUser.$id,
                    folderId: currentFolder.id,
                    type: file.type,
                    createdAt: serverTimestamp(),
                    bookmark: false
                })
            } catch (error) {
                console.log(error);
            }
        })
    }


    return (
        <Tooltip title="Upload File" placement="top" arrow>
            <Box sx={{ padding: '0.5rem', border: 1, borderRadius: 2, cursor: 'pointer' }}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/jpg,image/png,image/gif,image/jpeg,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" id="contained-button-file" multiple type="file" onChange={handleFileCapture} />
                    <IconButton sx={{ color: 'common.black' }} aria-label="upload picture" component="span">
                        <UploadFileIcon />
                    </IconButton>
                </label>
            </Box>
        </Tooltip>
    )
}