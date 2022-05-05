import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Typography } from '@mui/material';
import { ROOT_FOLDER } from '../hooks/useFolder';
import FolderIcon from '@mui/icons-material/Folder';
import Link from "next/link"
import { Box } from '@mui/system';

export default function BreadCrumb({ currentFolder }) {

    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) {
        path = [...path, currentFolder.path].flat()
    }
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {
                path.flat().length > 0 && path.map((folder, index) => (
                    <Link key={index} href={folder.id ? `/folder/${folder.id}` : '/dashboard'}>
                        <Box component="a" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <FolderIcon />
                            <Typography sx={{ margin: '0 0.2rem' }} variant="p" component="p">{folder.folderName}</Typography>
                        </Box>
                    </Link>
                ))
            }
            {
                currentFolder && (
                    <Box component="a" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <FolderIcon />
                        <Typography sx={{ margin: '0 0.2rem' }} variant="p" component="p">{currentFolder.folderName}</Typography>
                    </Box>
                )
            }
        </ Breadcrumbs>
    )
}