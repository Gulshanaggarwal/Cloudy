import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import Login from './login';
import Signup from './signup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router'
import appwrite from "../appwrite/appwrite"
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext';
import { LocalContext } from '../contexts/LocalContextProvider';



export default function Navbar() {

    const { dispatch } = useContext(LocalContext);
    const isUser = useContext(AuthContext);
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {

        try {
            await appwrite.account.deleteSession("current");
            router.replace("/");
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'common.black',
            width: '100%',
            padding: '1rem',
            flex: '0 1 auto',
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
                    padding: '0.3rem 0',
                    textAlign: 'center',
                    backgroundColor: 'common.white',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    color: 'primary.main',
                    position: 'relative'
                }} onClick={handleClick}>
                    <Typography variant="h4" component="h4">
                        {isUser.name[0]}
                    </Typography>
                </Box>
            }
            {
                isUser && <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem sx={{ borderLeft: router.pathname === "/dashboard" ? 3 : 0, borderLeftColor: 'primary.main', backgroundColor: 'grey.200' }}><Link href="/dashboard">
                        <a>Dashboard</a>
                    </Link></MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            }
            <Login />
            <Signup />
        </Box >
    )
}
