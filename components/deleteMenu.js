import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalContext } from "../contexts/LocalContextProvider";
import { useContext } from "react";
import { query, collection, getDoc, where, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase/firebase"
import { handleLoader } from "./resuables/loader";
import { ToastContext } from "../contexts/ToastContext";
import { AddToast } from "../components/resuables/toast"






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


const hideDeleteMenu = (dispatch) => {
    dispatch({
        type: "handleDeleteeLayer",
        payload: null
    })

}





export default function DeleteMenu() {

    const { deletee, dispatch } = useContext(LocalContext);
    const [, toastDispatch] = useContext(ToastContext);
    console.log(deletee);

    const handleClose = () => {
        dispatch({
            type: "handleDeleteeLayer",
            payload: null
        })
    }

    const handleDeleteItem = async (deletee) => {
        hideDeleteMenu(dispatch);
        handleLoader(dispatch, true);

        // If file
        if (deletee && deletee.fileId) {
            try {
                const d = doc(db, "files", where("fileId", "==", deletee.fileId))
                const docSnap = await getDoc(d);
                console.log(docSnap);
                if (docSnap.exists()) {
                    deleteDoc(docSnap.data());
                    AddToast("success", "File deleted successfully", toastDispatch);
                } else {

                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
                AddToast("error", "Couldn't delete try again!", toastDispatch);
            }
        }

        // If Folder
        if (deletee && deletee.folderId) {
            try {
                await deleteDoc(doc(db, "folders", deletee.folderId))
                AddToast("success", "Folder deleted Successfully", toastDispatch);
            } catch (error) {
                console.log(error);
                AddToast("error", "Couldn't delete try again!", toastDispatch);
            }
        }
        return handleLoader(dispatch, false);




    }

    return deletee && (
        <Menu id="deletee-menu"
            anchorEl={deletee.currentTarget}
            open={deletee.open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={() => handleDeleteItem(deletee)} sx={{ gap: '0.5rem' }}>
                <DeleteIcon />
                Delete
            </MenuItem>
        </Menu>
    )
}