import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LocalContext } from '../contexts/LocalContextProvider';
import { useContext } from 'react';
import Login from './login';
import Signup from './signup';
import useCurrentUser from '../hooks/currentUser';

export default function Navbar() {

    const { dispatch } = useContext(LocalContext);
    const isUser = useCurrentUser();

    console.log(isUser);
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'common.black',
            width: '100%',
            padding: '1rem',
        }}>
            <Typography variant="h4" component="h1" sx={{ color: 'common.white' }}>G-drive</Typography>
            {
                !isUser && <Stack direction="row" spacing={2}>
                    <Button variant="text" onClick={() => dispatch({
                        type: "setLoginVisibility",
                        payload: true
                    })}>Login</Button>
                    <Button variant="contained" onClick={() => dispatch({
                        type: "setSignupVisibility",
                        payload: true
                    })}>Signup</Button>
                </Stack>
            }
            {
                isUser && <Box sx={{
                    borderRadius: "50%",
                    padding: '0.5rem 0',
                    textAlign: 'center',
                    backgroundColor: 'common.white',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    color: 'primary.main',
                }}>
                    <Typography variant="h4" component="h4">
                        {isUser.name[0]}
                    </Typography>
                </Box>
            }
            <Login />
            <Signup />
        </Box>
    )
}
