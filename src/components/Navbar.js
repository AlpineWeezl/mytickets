import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { RestoreOutlined, Favorite, Person, Add, CreditCardSharp } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [value, setValue] = useState(null);

    const navigator = useNavigate();

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                className={'shadow'}
                onChange={(event, newValue) => {
                    console.log(newValue);
                    setValue(newValue);
                    navigator(newValue);
                }}
            >
                <BottomNavigationAction label="Profil" icon={<Person />} value={'/profile' } />
                <BottomNavigationAction label="Zeitkarten" icon={<CreditCardSharp />} value={'/passes'} />
                <BottomNavigationAction label="Nutzungen" icon={<RestoreOutlined />} value={'/usages'} />
                <BottomNavigationAction label="Nutzung" icon={<Add />} value={'/usages/new'} />
                <BottomNavigationAction label="Favoriten" icon={<Favorite />} value={'/favorites'} />
            </BottomNavigation>
        </Paper>
    )
}

export default Navbar