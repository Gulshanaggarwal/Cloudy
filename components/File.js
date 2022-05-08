import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import { useState, useContext } from "react";
import { LocalContext } from "../contexts/LocalContextProvider";
import { handleContextMenu } from "./deleteMenu";


export default function File({ file }) {


    const [hover, setHover] = useState(false);
    const { dispatch } = useContext(LocalContext);


    return <Box sx={{
        border: 1, borderRadius: 2, cursor: 'pointer', position: 'relative'
    }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} onClick={() => dispatch({
            type: 'handlePreview',
            payload: file
        })}
        onContextMenu={(e) => handleContextMenu(e, "FILE", file.fileId, dispatch)}
    >
        <Image
            src={file.href}
            alt={file.fileName}
            width="200"
            height="200"
            style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
        >
        </Image>
        <Box sx={{ display: 'flex', padding: '0.7rem 0.5rem', gap: '0.5rem' }}>
            {
                (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif") && <ImageIcon />
            }
            {
                file.type === "application/pdf" && <PictureAsPdfIcon />
            }
            {
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && <ArticleIcon />
            }
            <Typography variant="p" component="p">{file.fileName}</Typography>
            {hover && <Box sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'modal.main', opacity: '0.7', borderRadius: 2 }}></Box>}
        </Box>
    </Box>
}