import { Grid, Stack, SwipeableDrawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContextProvider";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';




export default function Details({ type, size, createdAt, fileName }) {

    const { drawer, dispatch } = useContext(LocalContext);
    const dateTime = dayjs(createdAt.seconds * 1000).format('DD MMMM YYYY, hh: mm: ss A');


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
            anchor="right"
            open={drawer}
            onClose={closeDrawer}>
            <Box sx={{ padding: '2rem', backgroundColor: 'grey.800', height: '100vh', color: 'common.white' }}>
                <CloseIcon onClick={closeDrawer} sx={{ float: 'right', cursor: 'pointer' }} />
                <Typography sx={{ padding: '3rem 0 0 0', }} fontSize="large" component="h2" variant="h4">General Info</Typography>
                <Stack spacing={3} sx={{ margin: '3rem 0' }}>
                    <Grid container>
                        <Grid xs={6} item>Type</Grid>
                        <Grid xs={6} item>{type}</Grid>
                    </Grid >
                    <Grid container>
                        <Grid xs={6} item>Filename</Grid>
                        <Grid xs={6} item>{fileName}</Grid>
                    </Grid >
                    <Grid container>
                        <Grid xs={6} item>Size</Grid>
                        <Grid xs={6} item>{size}</Grid>
                    </Grid >
                    <Grid container>
                        <Grid xs={6} item >Created</Grid>
                        <Grid xs={6} item>{dateTime}</Grid>
                    </Grid >
                </Stack>
            </Box>
        </SwipeableDrawer>
    )

}