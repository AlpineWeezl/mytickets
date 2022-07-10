import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { RestoreOutlined, Favorite, Person, Add, CreditCardSharp } from '@mui/icons-material';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";

const Navbar = () => {
    const { verified, user } = useContext(authContext);
    const [value, setValue] = useState(null);

    const navigator = useNavigate();
    
    if (!verified) {
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
            </BottomNavigation>
        </Paper>
    }

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
                <BottomNavigationAction label="Zeitkarten" icon={<CreditCardSharp />} value={`/passes/user/${user._id}`} />
                <BottomNavigationAction label="Nutzungen" icon={<RestoreOutlined />} value={'/usages'} />
                <BottomNavigationAction label="Nutzung" icon={<Add />} value={'/usages/new'} />
                <BottomNavigationAction label="Favoriten" icon={<Favorite />} value={'/favorites'} />
            </BottomNavigation>
        </Paper>
    )
}

export default Navbar