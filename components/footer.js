import { Box } from "@mui/system";
import TagIcon from '@mui/icons-material/Tag';
import { Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "@mui/material";
import { Stack } from "@mui/material";

export default function Footer() {
    return (
        <Box component="footer" sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'common.black', color: 'common.white', padding: '1rem', }}>
            <Box sx={{ display: 'flex' }}>
                <TagIcon />
                <Typography variant="p" component="p">
                    Built by <Link href="https://gulshanaggarwal.github.io/portfolio/" underline="hover" target="_blank" rel="noopener" >Gulshan Aggarwal</Link> using Appwrite 🔥 and NextJS ✨
                </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
                <Link sx={{ color: 'common.white' }} href="https://twitter.com/gulshanagg333" target="_blank" rel="noopener">
                    <TwitterIcon />
                </Link>
                <Link sx={{ color: 'common.white' }} href="https://github.com/Gulshanaggarwal" target="_blank" rel="noopener">
                    <GitHubIcon />
                </Link>
                <Link sx={{ color: 'common.white' }} href="https://www.linkedin.com/in/gulshan-aggarwal-64b4121a3" target="_blank" rel="noopener">
                    <LinkedInIcon />
                </Link>
            </Stack>
        </Box>
    )
}