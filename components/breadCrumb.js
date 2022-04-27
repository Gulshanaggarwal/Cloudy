import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from '@mui/material';


export default function BreadCrumb() {
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link
                underline="hover"
                key="2"
                color="inherit"
                href="/dashboard"
            >
                My drive
            </Link>
        </ Breadcrumbs>
    )
}