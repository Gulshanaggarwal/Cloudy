import Snackbar from '@mui/material/Snackbar';
import { ToastContext } from '../../contexts/ToastContext';
import { useContext } from 'react';
import { Alert } from '@mui/material';
import { nanoid } from 'nanoid'

const removeToast = (id, toastDispatch) => {
    toastDispatch({
        type: "REMOVE",
        payload: { id }
    })

}

export const AddToast = (type, text, toastDispatch) => {
    const id = nanoid();
    toastDispatch({
        type: "ADD",
        payload: { id, type, text }
    })

    setTimeout(() => {
        removeToast(id, toastDispatch)
    }, 3000)

}

export default function ToastBar() {
    const [toasts] = useContext(ToastContext);
    const vertical = "bottom";
    const horizontal = "right";



    return toasts.length > 0 && toasts.map((ele) => (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={true}
            key={ele.id}
        >
            <Alert severity={ele.type} sx={{ width: '100%' }}>
                {ele.text}
            </Alert>
        </Snackbar>
    ))
}