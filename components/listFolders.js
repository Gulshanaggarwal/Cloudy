import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import FolderBtn from "./folderBtn";

export default function ListFolders({ childFolders }) {
    return childFolders.length > 0 && (
        <Box sx={{ padding: '2rem 0' }}>
            <Typography sx={{ padding: '1rem 0' }} component="h5" variant="h6">Folders</Typography>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                {
                    childFolders.map((childFolder, index) => (
                        <FolderBtn childFolder={childFolder} key={index} />
                    ))
                }
            </Box>
        </Box>
    )
}