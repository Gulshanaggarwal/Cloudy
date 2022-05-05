import { Grid, Stack, Typography } from "@mui/material";
import AddFile from "./addFile";
import AddFolder from "./addFolder";
import BreadCrumb from "./breadCrumb";
import { Box } from "@mui/system";
import AddFolderModal from "./AddFolderModal";
import useFolder from "../hooks/useFolder";
import FolderBtn from "./FolderBtn";



export default function FileFolderDisplay({ folderId }) {

    const folderState = useFolder(folderId);

    return (
        <Grid item sx={{ padding: '2rem' }} xs={10} >
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                <BreadCrumb currentFolder={folderState.folder} />
                <Stack direction="row" spacing={2}>
                    <AddFile currentFolder={folderState.folder} />
                    <AddFolder />
                </Stack>
            </Box>
            {folderState.childFolders.length === 0 && folderState.childFiles.length === 0 && (
                <Box sx={{ textAlign: 'center', border: 1, borderRadius: 2, padding: '4rem 1rem', margin: '1.5rem 0' }}>
                    <Typography>
                        Create a Folder or Upload a File to get started
                    </Typography>
                </Box>
            )}
            {
                folderState.childFolders.length > 0 && (
                    <Box sx={{ padding: '2rem 0' }}>
                        <Typography sx={{ padding: '1rem 0' }} component="h5" variant="h6">Folders</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            {
                                folderState.childFolders.map((childFolder, index) => (
                                    <FolderBtn childFolder={childFolder} key={index} />
                                ))
                            }
                        </Box>
                    </Box>
                )
            }
            <AddFolderModal currentFolder={folderState.folder} />
        </Grid>
    )
}