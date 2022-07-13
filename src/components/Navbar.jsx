import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { RestoreOutlined, Favorite, Person, CreditCardSharp, Login } from '@mui/icons-material';
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
                onChange={(event, newValue) => {
                    setValue(newValue);
                    navigator(newValue);
                }}
                >
                {(verified && user) && <BottomNavigationAction label="Profil" icon={<Person />} value={'/profile'} />}
                {(verified && user) && <BottomNavigationAction label="Zeitkarten" icon={<CreditCardSharp />} value={`/passes/user/${user._id}`} />}
                {(verified && user) && <BottomNavigationAction label="Nutzungen" icon={<RestoreOutlined />} value={'/usages'} />}
                {(verified && user) && <BottomNavigationAction label="Favoriten" icon={<Favorite />} value={'/favorites'} />}
                {!verified && <BottomNavigationAction label="Login" icon={<Login />} value={'/login'} />}
            </BottomNavigation>
        </Paper>
    )
}

export default Navbar