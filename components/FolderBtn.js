import FolderIcon from '@mui/icons-material/Folder';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';

export default function FolderBtn({ childFolder }) {
    return (
        <Link href={`/folder/${childFolder.id}`}>
            <Box component="a" sx={{
                padding: '0.5rem 3rem 0.5rem 1rem',
                border: 1,
                borderRadius: 1,
                display: 'flex',
                cursor: 'pointer'
            }}>
                <FolderIcon />
                <Typography variant="p" component="p" sx={{
                    padding: '0 1rem'
                }}>{childFolder.folderName}</Typography>
            </Box>
        </Link>
    )
}