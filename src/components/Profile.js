import { KeyOutlined, Logout, PersonOutlined, RestartAlt, Save } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Container, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const Profile = () => {
    const { verified, user, setUser, token } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        !verified && navigate('/login')
    }, [navigate, verified]);

    const updateHandler = (e) => {
        e.preventDefault();
        const { email, firstname } = e.target;
        if (!email.value) {
            toast.warning('Bitte gib eine E-Mail Adresse ein!');
            return;
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        const modUser =
        {
            user: {
                email: email.value,
                firstname: firstname.value
            }
        }
        console.log(modUser);

        axios
            .put(`${apiUrl}/users/${user._id}`, modUser, { headers: { authorization: token } })
            .then(res => {
                console.log(res.data.user);
                setUser(res.data.user);
                toast.success('Profil erfolgreich geändert');
            })
            .catch(err => {
                toast.error('Die Änderung konnte nicht gespeichert werden!')
            });
    }

    const passwordHandler = (e) => {
        e.preventDefault();
        const { password, passwordRepeat } = e.target;

        if (password.value !== passwordRepeat.value) {
            toast.warning('Die Passwörter stimmen nicht überein!');
            return;
        }
        if (password.value && (password.value.length < 6)) {
            toast.warning('Das Passwort muss mindestens 6 Zeichen enthalten!');
            return;
        }
    }

    return (
        <Container sx={{ marginY: 3 }}>
            <Card>
                <CardHeader
                    title={`Hallo ${user.firstname ? user.firstname : user.username}`}
                    sx={{ textAlign: 'center' }}
                />
                {user.firstname && (<h3 style={{ 'textAlign': 'center' }}>({user.username})</h3>)}
                <CardContent>
                    <form onSubmit={updateHandler}>
                        <FormControl sx={{ width: 1, marginY: 3 }}>
                            <InputLabel htmlFor="email">E-Mail Adresse</InputLabel>
                            <Input id="email" aria-describedby="email-helper-text" type="email" sx={{ paddingX: 2 }} defaultValue={user.email} />
                            <FormHelperText id="email-helper-text">Bitte trage hier deine E-Mail Adresse ein.</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ width: 1, marginY: 3 }}>
                            <InputLabel htmlFor="firstname">Vorname</InputLabel>
                            <Input id="firstname" aria-describedby="firstname-helper-text" type="firstname" defaultValue={user.firstname} />
                            <FormHelperText id="email-helper-text">Hier kannst du deinen Vornamen eintragen.</FormHelperText>
                        </FormControl>
                        <Container sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="reset" variant="contained" color="error"><PersonOutlined /> <RestartAlt /></Button>
                            <Button type="submit" variant="contained" color="success"><PersonOutlined /> <Save /></Button>
                        </Container>
                    </form>
                    <form onSubmit={passwordHandler}>
                        <FormControl sx={{ width: 1, marginY: 3 }}>
                            <InputLabel htmlFor="password">Passwort</InputLabel>
                            <Input id="password" aria-describedby="password-helper-text" type="password" sx={{ paddingX: 2 }} />
                            <FormHelperText id="email-helper-text">Bitte trage hier dein Passwort ein.</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ width: 1, marginY: 3 }}>
                            <InputLabel htmlFor="passwordRepeat">Passwort wiederholen</InputLabel>
                            <Input id="passwordRepeat" aria-describedby="password-repeat-helper-text" sx={{ paddingX: 2 }} type="password" />
                            <FormHelperText id="email-helper-text">Bitte wiederhole hier dein Passwort.</FormHelperText>
                        </FormControl>
                        <Container sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="reset" variant="contained" color="error"><KeyOutlined /> <RestartAlt /></Button>
                            <Button type="submit" variant="contained" color="success"><KeyOutlined /> <Save /></Button>
                        </Container>
                    </form>
                </CardContent>
            </Card>
            <Container sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <Button type="button" variant="outlined" color="error"><Logout /></Button>

            </Container>
        </Container>
    )
}

export default Profile