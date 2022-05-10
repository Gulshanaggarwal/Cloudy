import { Stack, Typography } from "@mui/material";
import AddFile from "./addFile";
import AddFolder from "./addFolder";
import BreadCrumb from "./breadCrumb";
import { Box } from "@mui/system";
import AddFolderModal from "./addFolderModal";
import useFolder from "../hooks/useFolder";
import ListFolders from "./listFolders";
import File from "./file";
import DeleteMenu from "./deleteMenu";



export default function FileFolderDisplay({ folderId }) {

    const folderState = useFolder(folderId);

    return (
        <Box sx={{ padding: '4rem', overflowX: 'hidden', flex: '1 1 auto' }}>
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                <BreadCrumb currentFolder={folderState.folder} />
                <Stack direction="row" spacing={2}>
                    <AddFile currentFolder={folderState.folder} />
                    <AddFolder />
                </Stack>
            </Box>
            {folderState.childFolders.length === 0 && folderState.childFiles.length === 0 && (
                <Box sx={{ textAlign: 'center', border: 1, borderRadius: 2, padding: '4rem 1rem', margin: '1.5rem 0', borderColor: 'grey.600' }}>
                    <Typography component="p" variant="p" sx={{ color: 'grey.600', }}>
                        Create a Folder or Upload a File to get started
                    </Typography>
                </Box>
            )}
            <ListFolders childFolders={folderState.childFolders} />
            {
                folderState.childFiles.length > 0 && <Box>
                    <Typography sx={{ padding: '1rem 0' }} component="h5" variant="h6">Files</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                        {
                            folderState.childFiles.map((file, index) => (
                                <File key={index} file={file} />
                            ))
                        }
                    </Box>
                </Box>
            }
            <AddFolderModal currentFolder={folderState.folder} />
            <DeleteMenu />
        </Box>
    )
}