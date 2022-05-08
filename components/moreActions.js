import { Divider, Menu, MenuItem } from "@mui/material";
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';
import LinkIcon from '@mui/icons-material/Link';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContextProvider";
import { AddToast } from "./resuables/toast";
import { ToastContext } from "../contexts/ToastContext";



export default function MoreActions({ file }) {

    const { moreActions, dispatch } = useContext(LocalContext);
    const [, toastDispatch] = useContext(ToastContext);
    const open = Boolean(moreActions);


    const handleClose = () => {
        dispatch({
            type: "handleMoreActions",
            payload: null
        })
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(file.href);
        AddToast("info", "Copied to clipboard", toastDispatch);
    }

    return (
        <Menu id="more-actions-menu"
            sx={{ right: '3rem' }}
            anchorEl={moreActions}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}>
            <MenuItem sx={{ gap: '1rem' }} onClick={handleCopyLink}>
                <LinkIcon />
                Get Link
            </MenuItem>
            <MenuItem sx={{ gap: '1rem' }}>
                <StarRateSharpIcon />
                Add Star
            </MenuItem>
            <MenuItem sx={{ gap: '1rem' }}>
                <InfoOutlinedIcon />
                Details
            </MenuItem>
            <Divider />
            <MenuItem sx={{ gap: '1rem' }}>
                <OpenInNewOutlinedIcon />
                open in new window
            </MenuItem>
        </Menu>
    )
}