import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';



export default function AddFolder() {
    return (
        <Tooltip title="Add Folder" placement="top" arrow>
            <Box sx={{ padding: '1rem', border: 1, borderRadius: 2, cursor: 'pointer' }}>
                <CreateNewFolderIcon />
            </Box>
        </Tooltip>
    )
}