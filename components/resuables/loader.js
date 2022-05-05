import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LocalContext } from '../../contexts/LocalContextProvider';
import { useContext } from 'react';

export const handleLoader = (dispatch, payload) => {
    dispatch({
        type: "setLoader",
        payload
    })

}


export default function Loader() {

    const { loader: open } = useContext(LocalContext);

    return open && (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 50 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}