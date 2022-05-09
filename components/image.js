import { Box } from "@mui/system";
import Image from "next/image";





export default function ImageComp({ url, alt }) {
    return (
        <Box sx={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Image
                src={url}
                alt={alt}
                width="200"
                height="500"
            />
        </Box>
    )
}