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



export default function Preview() {

    const { preview, dispatch } = useContext(LocalContext);

    const handleClose = () => {
        dispatch({
            type: "handlePreview",
            payload: false
        })

    }

    return preview && (
        <Box sx={{ position: 'fixed', width: '100%', height: '100%', backgroundColor: 'modal.dark', left: '0', right: '0', }}>
            <Box sx={{ position: 'fixed', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0.5rem' }}>
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
                            <Box>
                                <FileDownloadOutlinedIcon fontSize="medium" sx={{ color: 'common.white', cursor: 'pointer' }} />
                            </Box>
                        </Tooltip>
                    </Box>
                    <Box>
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
            </Box>
        </Box>
    )
}