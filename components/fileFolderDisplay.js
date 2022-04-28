import { Grid, Stack, Typography } from "@mui/material";
import AddFile from "./addFile";
import AddFolder from "./addFolder";
import BreadCrumb from "./breadCrumb";
import { Box } from "@mui/system";
import AddFolderModal from "./AddFolderModal";



export default function FileFolderDisplay() {
    return (
        <Grid item sx={{ padding: '2rem' }} xs={10} >
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                <BreadCrumb />
                <Stack direction="row" spacing={2}>
                    <AddFile />
                    <AddFolder />
                </Stack>
            </Box>
            <Box sx={{ textAlign: 'center', border: 1, borderRadius: 2, padding: '4rem 1rem', margin: '1.5rem 0' }}>
                <Typography>
                    Create a Folder or Upload a File to get started
                </Typography>
            </Box>
            <AddFolderModal />
        </Grid>
    )
}