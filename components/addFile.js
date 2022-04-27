import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import UploadFileIcon from '@mui/icons-material/UploadFile';


export default function AddFile() {
    return (
        <Tooltip title="Upload File" placement="top" arrow>
            <Box sx={{ padding: '1rem', border: 1, borderRadius: 2, cursor: 'pointer' }}>
                <UploadFileIcon />
            </Box>
        </Tooltip>
    )
}