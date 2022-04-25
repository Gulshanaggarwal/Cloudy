import { LocalContext } from "../contexts/LocalContextProvider"
import { useContext, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import appwrite from "../appwrite/appwrite";

export default function Signup() {
    const { signupWindow, dispatch } = useContext(LocalContext);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {

        if (fullName.trim() === "") {
            return;
        }
        if (email.trim() === "") {
            return;
        }
        if (password.trim() === "") {
            return;
        }
        if (password.length < 8) {
            return;
        }

        try {
            const response = await appwrite.account.create('unique()', email, password, fullName);
        } catch (error) {
            console.log(error);
        }


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
                        <TextField value={fullName} id="outlined-basic" label="Full Name" size="small" variant="outlined" onChange={(e) => setFullName(e.target.value)} />
                        <TextField value={email} id="outlined-basic" label="Email" size="small" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                        <TextField value={password} id="outlined-basic" label="Set Password" size="small" variant="outlined" placeholder="Password must contain at least 8 characters" onChange={(e) => setPassword(e.target.value)} />
                    </Stack>
                    <Button variant="contained" sx={{ margin: "1rem 0" }} onClick={handleSignUp}>Signup</Button>
                </Box>
            </Container>
        </Box>
    )
}