import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router"
import FileFolderDisplay from "../../components/fileFolderDisplay";
import { Box } from "@mui/material";


export default function DynamicFolder() {

    const isUser = useContext(AuthContext);
    const router = useRouter();

    return isUser && (
        <Box sx={{ flex: '1 1 auto', }} >
            <FileFolderDisplay folderId={router.query.folderId} />
        </ Box>


    )
}