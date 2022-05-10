import { Box } from "@mui/system";
import Image from "next/image";





export default function ImageComp({ url, alt }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
                src={url}
                alt={alt}
                width="250"
                height="400"
            />
        </Box>
    )
}