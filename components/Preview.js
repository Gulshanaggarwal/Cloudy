import { Tooltip, Typography } from "@mui/material";
import { LocalContext } from "../contexts/LocalContextProvider";
import { useContext } from "react";
import { Box } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import { AuthContext } from "../contexts/AuthContext";
import ImageComp from "./image";
import appwrite from "../appwrite/appwrite";
import MoreActions from "./moreActions";
import Details from "./details";



export default function Preview() {

    const { preview, dispatch } = useContext(LocalContext);
    const isUser = useContext(AuthContext);

    const handleClose = () => {
        dispatch({
            type: "handlePreview",
            payload: false
        })

    }

    const handleDownload = (e, fileId) => {

        const result = appwrite.storage.getFileDownload(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKETID, fileId);
        window.open(result.href)
    }


    const handle3dotClick = (e) => {
        dispatch({
            type: "handleMoreActions",
            payload: e.currentTarget
        })
    }



    return isUser && preview && (
        <Box sx={{ position: 'fixed', width: '100%', height: '100%', backgroundColor: 'modal.dark', left: '0', right: '0', }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0 1rem' }}>
                    <Tooltip title="Close" placement="bottom" arrow>
                        <Box onClick={handleClose} sx={{
                            padding: '0.5rem',
                            '&:hover': {
                                backgroundColor: 'grey.700',
                                borderRadius: 2,
                            }
                        }}>
                            <ArrowBackIcon fontSize="medium" sx={{ color: 'common.white', cursor: 'pointer' }} />
                        </Box>
                    </Tooltip>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0 0.5rem' }}>
                        {
                            (preview.type === "image/jpeg" || preview.type === "image/jpg" || preview.type === "image/png" || preview.type === "image/gif") && <ImageIcon fontSize="medium" sx={{ color: 'common.white' }} />
                        }
                        {
                            preview.type === "application/pdf" && <PictureAsPdfIcon fontSize="medium" sx={{ color: 'common.white' }} />
                        }
                        {
                            preview.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && <ArticleIcon fontSize="medium" sx={{ color: 'common.white' }} />
                        }
                        <Typography sx={{ color: 'common.white' }} variant="p" component="p">{preview.fileName}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                    <Box sx={{
                        padding: '0.5rem',
                        '&:hover': {
                            backgroundColor: 'grey.700',
                            borderRadius: 2,
                        }
                    }}>
                        <Tooltip title="Download" placement="bottom" arrow>
                            <Box onClick={(e) => handleDownload(e, preview.fileId)}>
                                <FileDownloadOutlinedIcon fontSize="medium" sx={{ color: 'common.white', cursor: 'pointer' }} />
                            </Box>
                        </Tooltip>
                    </Box>
                    <Box onClick={handle3dotClick}>
                        <Tooltip title="More actions" placement="bottom" arrow>
                            <Box sx={{
                                padding: '0.5rem',
                                '&:hover': {
                                    backgroundColor: 'grey.700',
                                    borderRadius: 2,
                                }
                            }}>
                                <MoreVertOutlinedIcon fontSize="medium" sx={{ color: 'common.white', cursor: 'pointer' }} />
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
            <Box>
                {(preview.type === "image/jpeg" || preview.type === "image/jpg" || preview.type === "image/png" || preview.type === "image/gif") && <ImageComp url={preview.href} alt={preview.fileName} />}
                {
                    (preview.type === "application/pdf" || preview.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || preview.type === "application/msword") && <Typography fontSize="large" sx={{ color: 'primary.main', textAlign: 'center' }} variant="p" component="h4">Sorry ! preview is not available for documents</Typography>
                }
            </Box>
            <MoreActions file={preview} />
            <Details type={preview.type} createdAt={preview.createdAt} size={preview.size} />
        </Box>
    )
}