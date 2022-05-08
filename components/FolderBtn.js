import FolderIcon from '@mui/icons-material/Folder';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { LocalContext } from '../contexts/LocalContextProvider';
import { useContext } from 'react';
import { handleContextMenu } from './deleteMenu';

export default function FolderBtn({ childFolder }) {

    const { dispatch } = useContext(LocalContext);






    return (
        <Link href={`/folder/${childFolder.id}`}>
            <Box component="a" sx={{
                padding: '0.5rem 3rem 0.5rem 1rem',
                border: 1,
                borderRadius: 1,
                display: 'flex',
                cursor: 'pointer'
            }} onContextMenu={(e) => handleContextMenu(e, "FOLDER", childFolder.id, dispatch)}>
                <FolderIcon />
                <Typography variant="p" component="p" sx={{
                    padding: '0 1rem'
                }}>{childFolder.folderName}</Typography>
            </Box>
        </Link>
    )
}