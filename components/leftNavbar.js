import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useRouter } from "next/router";

export default function LeftNavbar() {
    const router = useRouter();

    const data = [
        {
            icon: <WarehouseOutlinedIcon />,
            label: 'My drive'
        },
        {
            icon: <AccessTimeOutlinedIcon />,
            label: 'Recent'
        },
        {
            icon: <StarBorderOutlinedIcon />,
            label: 'Starred'
        }
    ]
    return (
        <Grid item sx={{ padding: '2rem 0', borderRight: 2, borderColor: 'primary.main', }} xs={2}>
            {
                data.map((item) => (
                    <ListItemButton
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, margin: '1rem 0' }}
                        onClick={() => router.push("/myAccount")}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))
            }
        </Grid>
    )
}