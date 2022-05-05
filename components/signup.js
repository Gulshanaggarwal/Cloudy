import { LocalContext } from "../contexts/LocalContextProvider"
import { useContext, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import appwrite from "../appwrite/appwrite";
import { ToastContext } from "../contexts/ToastContext";
import { AddToast } from "./resuables/Toast";
import { handleLoader } from "./resuables/loader";


export default function Signup() {
    const { signupWindow, loader, dispatch } = useContext(LocalContext);
    const [, toastDispatch] = useContext(ToastContext);

    const [fullName, setFullName] = useState("");
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

    const handleSignUp = async () => {
        setError(false);

        if (fullName.trim() === "") {

            return handleErrors("This is a required Field", "NAME");
        }
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
            handleLoader(dispatch, true);
            const response = await appwrite.account.create('unique()', email, password, fullName);
            //AddToast("success", "Account Created Successfully!", toastDispatch);

        } catch (error) {
            console.log(error);
            if (error.code === 400) {
                handleErrors("Invalid Email Address", "EMAIL");
            }
            else if (error.code === 409) {
                handleErrors("Email Already Exists", "EMAIL");
            }
            else {
                AddToast("error", error.message, toastDispatch);
            }
        }
        handleLoader(dispatch, false);


    }

    return signupWindow && (
        <Box sx={{ width: "100%", height: '100vh', backgroundColor: 'modal.main', position: 'fixed', top: '0', left: '0', zIndex: 'modal', padding: '7rem 1rem' }}>
            <Container sx={{
                backgroundColor: 'secondary.main',
                borderRadius: '10px',
                padding: '1rem'
            }}>
                <CloseIcon onClick={() => dispatch({
                    type: 'setSignupVisibility',
                    payload: null
                })} sx={{
                    float: 'right',
                    cursor: 'pointer'
                }} color="primary" />
                <Typography variant="h5" component="h3" sx={{
                    padding: '1rem 0'
                }}>
                    Signup
                </Typography>
                <Box component="form" autoComplete="off" sx={{ padding: '1rem 0' }}>
                    <Stack spacing={3}>
                        <TextField error={error && errorField === "NAME" && true} helperText={(error && errorField === "NAME") ? errorMessage : false} value={fullName} id="outlined-basic" label="Full Name" size="small" variant="outlined" onChange={(e) => setFullName(e.target.value)} />
                        <TextField error={error && errorField === "EMAIL" && true} helperText={(error && errorField === "EMAIL") ? errorMessage : false} value={email} id="outlined-basic" label="Email" size="small" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                        <TextField error={error && errorField === "PASSWORD" && true} helperText={(error && errorField === "PASSWORD") ? errorMessage : false} value={password} id="outlined-basic" label="Set Password" size="small" variant="outlined" placeholder="Password must contain at least 8 characters" onChange={(e) => setPassword(e.target.value)} />
                    </Stack>
                    <Button variant="contained" sx={{ margin: "1rem 0" }} onClick={handleSignUp}>Signup</Button>
                </Box>
            </Container>
        </Box>
    )
}