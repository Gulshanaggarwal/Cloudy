import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';


const Input = styled('input')({
    display: 'none',
});


export default function AddFile() {
    return (
        <Tooltip title="Upload File" placement="top" arrow>
            <Box sx={{ padding: '0.5rem', border: 1, borderRadius: 2, cursor: 'pointer' }}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <UploadFileIcon />
                    </IconButton>
                </label>
            </Box>
        </Tooltip>
    )
}