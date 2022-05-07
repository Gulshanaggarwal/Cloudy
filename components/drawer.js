import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import { LocalContext } from "../contexts/LocalContextProvider";
import { useContext } from "react";
import Link from "next/link";
import WarehouseSharpIcon from '@mui/icons-material/WarehouseSharp';
import AccessTimeFilledSharpIcon from '@mui/icons-material/AccessTimeFilledSharp';
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';


export default function Drawer() {

    const { drawer, dispatch } = useContext(LocalContext);

    const closeDrawer = (e) => {
        if (
            e &&
            e.type === 'keydown' &&
            (e.key === 'Tab' || e.key === 'Shift')
        ) {
            return;
        }
        dispatch({
            type: "handleDrawer",
            payload: false
        })
    }

    return (
        <SwipeableDrawer
            anchor="left"
            open={drawer}
            onClose={closeDrawer}
        >
            <List>
                <Link href="/dashboard">
                    <a>
                        <ListItem sx={{
                            '&:hover': {
                                backgroundColor: 'grey.200',
                            }
                        }}>
                            <ListItemIcon>
                                <WarehouseSharpIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary="My Drive" />
                        </ListItem>
                    </a>
                </Link>
                <Link href="/recent">
                    <a>
                        <ListItem sx={{
                            '&:hover': {
                                backgroundColor: 'grey.200',
                            }
                        }}>
                            <ListItemIcon>
                                <AccessTimeFilledSharpIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary="Recent" />
                        </ListItem>
                    </a>
                </Link>
                <Link href="/starred">
                    <a>
                        <ListItem sx={{
                            '&:hover': {
                                backgroundColor: 'grey.200',
                            }
                        }}>
                            <ListItemIcon>
                                <StarRateSharpIcon sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </a>
                </Link>
            </List>
        </SwipeableDrawer>
    )
}

