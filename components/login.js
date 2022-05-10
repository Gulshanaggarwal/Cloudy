import { LocalContext } from "../contexts/LocalContextProvider"
import { useContext, useState } from "react";
import { Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Box, margin } from "@mui/system";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import appwrite from "../appwrite/appwrite"
import { AddToast } from "./resuables/toast";
import { ToastContext } from "../contexts/ToastContext";

export default function Login() {
    const { loginWindow, dispatch } = useContext(LocalContext);
    const [, toastDispatch] = useContext(ToastContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorField, setErrorField] = useState(false);

    const handleErrors = (message, Field) => {

        setError(true);
        setErrorMessage(message);
        setErrorField(Field)
    }

    const handleLogin = async () => {
        if (email.trim() === "") {
            return handleErrors("This is a required Field", "EMAIL");
        }
        if (password.trim() === "") {
            return handleErrors("This is a required Field", "PASSWORD");
        }
        if (password.length < 8) {
            return handleErrors("Password must contain at least 8 characters", "PASSWORD");
        }

        try {
            await appwrite.account.createSession(email, password);
            dispatch({
                type: "setLoginVisibility",
                payload: null
            })
            window.location.replace("/dashboard")

        } catch (error) {
            if (error.code === 401) {
                AddToast("error", "Invalid Credentials", toastDispatch);
            }
            else {
                AddToast("error", error.message, toastDispatch);
            }
        }
    }

    return loginWindow && (
        <Box sx={{ width: "100%", height: '100vh', backgroundColor: 'modal.main', position: 'fixed', top: '0', left: '0', zIndex: 'modal', padding: '7rem 1rem' }}>
            <Container sx={{
                backgroundColor: 'secondary.main',
                borderRadius: '10px',
                padding: '1rem',
            }}>
                <CloseIcon onClick={() => dispatch({
                    type: 'setLoginVisibility',
                    payload: null
                })} sx={{
                    float: 'right',
                    cursor: 'pointer'
                }} color="primary" />
                <Typography variant="h5" component="h3" sx={{
                    padding: '1rem 0'
                }}>
                    Login
                </Typography>
                <Box component="form" autoComplete="off" sx={{ padding: '1rem 0' }}>
                    <Stack spacing={3}>
                        <TextField error={error && errorField === "EMAIL" && true} helperText={(error && errorField === "EMAIL") ? errorMessage : false} value={email} id="outlined-basic" label="Email" size="small" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                        <TextField error={error && errorField === "PASSWORD" && true} helperText={(error && errorField === "PASSWORD") ? errorMessage : false} value={password} id="outlined-basic" label="Password" size="small" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                    </Stack>
                    <Button variant="contained" sx={{ margin: "1rem 0" }} onClick={handleLogin}>Login</Button>
                </Box>
            </Container>
        </Box>
    )
}