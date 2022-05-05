import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";


const Input = styled('input')({
    display: 'none',
});

const supportedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/txt"];
const MAX_FILE_SIZE = 10485760   // 10bytes;

export default function AddFile() {

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileCapture = (e) => {

        let files = [];
        let count = 0;

        while (count < e.target.files.length) {
            if (supportedFileTypes.includes(e.target.files[count].type) && e.target.files[count].size <= MAX_FILE_SIZE) {
                files.push(e.target.files[count]);
            }
            else {
                console.log("error");
                break;
            }
            count++;
        }
    }


    return (
        <Tooltip title="Upload File" placement="top" arrow>
            <Box sx={{ padding: '0.5rem', border: 1, borderRadius: 2, cursor: 'pointer' }}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileCapture} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <UploadFileIcon />
                    </IconButton>
                </label>
            </Box>
        </Tooltip>
    )
}