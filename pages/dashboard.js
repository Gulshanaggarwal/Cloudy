import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import FileFolderDisplay from "../components/fileFolderDisplay";
import LeftNavbar from "../components/leftNavbar";
import { AuthContext } from "../contexts/AuthContext";


export default function Dashboard() {

    const isUser = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isUser) {
            router.replace("/");
        }
    }, [isUser])



    return isUser && (
        <Grid container sx={{ flex: '1 1 auto', }} >
            <LeftNavbar />
            <FileFolderDisplay />
        </ Grid>
    )
}