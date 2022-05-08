import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalContext } from "../contexts/LocalContextProvider";
import { useContext } from "react";






export const handleContextMenu = (e, type, id, dispatch) => {
    e.preventDefault();

    if (e.which === 3 || e.button === 2) {
        if (type === "FILE" && id) {
            return dispatch({
                type: "handleDeleteeLayer",
                payload: { fileId: id, currentTarget: e.currentTarget, open: Boolean(e.currentTarget) }
            })
        }
        dispatch({
            type: "handleDeleteeLayer",
            payload: { folderId: id, currentTarget: e.currentTarget, open: Boolean(e.currentTarget) }
        })

    }

}





export default function DeleteMenu() {

    const { deletee, dispatch } = useContext(LocalContext);
    console.log(deletee);

    const handleClose = () => {
        dispatch({
            type: "handleDeleteeLayer",
            payload: null
        })
    }

    return deletee && (
        <Menu id="deletee-menu"
            anchorEl={deletee.currentTarget}
            open={deletee.open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}>
            <MenuItem sx={{ gap: '0.5rem' }}>
                <DeleteIcon />
                Delete
            </MenuItem>
        </Menu>
    )
}