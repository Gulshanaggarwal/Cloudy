import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router"
import FileFolderDisplay from "../../components/fileFolderDisplay";
import LeftNavbar from "../../components/leftNavbar";
import { Grid } from "@mui/material";


export default function DynamicFolder() {

    const isUser = useContext(AuthContext);
    const router = useRouter();

    return isUser && (
        <Grid container sx={{ flex: '1 1 auto', }} >
            <LeftNavbar />
            <FileFolderDisplay folderId={router.query.folderId} />
        </ Grid>


    )
}