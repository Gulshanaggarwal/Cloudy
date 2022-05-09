import { Divider, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContextProvider";
import dayjs from "dayjs";




export default function Details({ type, size, createdAt }) {

    const { drawer, dispatch } = useContext(LocalContext);
    const dateTime = dayjs(createdAt.seconds * 1000).format('DD MMMM YYYY, hh: mm: ss A');
    console.log(createdAt);


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
            sx={{ width: '400px' }}
            anchor="right"
            open={drawer}
            onClose={closeDrawer}>
            <Box sx={{ padding: '2rem' }}>
                <Divider textAlign="left">
                    <Typography fontSize="large" component="h2" variant="h4">General Info</Typography>
                </Divider>
                <Stack spacing={3} sx={{ margin: '3rem 0' }}>
                    <Stack direction="row" spacing={8 * 2}>
                        <Typography>Type</Typography>
                        <Typography>{type}</Typography>
                    </Stack >

                    <Stack direction="row" spacing={8 * 2}>
                        <Typography>Size</Typography>
                        <Typography>{size}</Typography>
                    </Stack >
                    <Stack direction="row" spacing={8 * 2}>
                        <Typography>Created</Typography>
                        <Typography>{dateTime}</Typography>
                    </Stack >
                </Stack>
            </Box>
        </SwipeableDrawer>
    )

}