import { Box } from "@mui/system";
import TagIcon from "@mui/icons-material/Tag";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "common.black",
        color: "common.white",
        padding: "1rem",
      }}
    >
      <Box sx={{ display: "flex" }}>
        {/* <TagIcon /> */}
        <Typography variant="p" component="p">
          {"</> "} by{" "}
          <Link
            href="https://gulshanaggarwal.github.io/portfolio/"
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            Gulshan
          </Link>{" "}
          and{" "}
          <Link
            href="https://anirudhsoni.ml"
            underline="hover"
            target="_blank"
            rel="noopener"
          >
            Anirudhh
          </Link>{" "}
          using Appwrite 🔥 and NextJS ✨
        </Typography>
      </Box>
    </Box>
  );
}
