import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContextProvider";



export default function AddFolder() {
    const { dispatch } = useContext(LocalContext);

    const showFolderModal = () => {
        dispatch({
            type: "setFolderModalVisibility",
            payload: true
        })
    }
    return (
        <Tooltip title="Add Folder" placement="top" arrow>
            <Box sx={{ padding: '1rem', border: 1, borderRadius: 2, cursor: 'pointer' }} onClick={showFolderModal}>
                <CreateNewFolderIcon />
            </Box>
        </Tooltip>
    )
}