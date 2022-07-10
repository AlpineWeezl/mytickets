import { LoginOutlined, RestartAlt } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Container, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const Login = () => {
    const { verified, setVerified, setToken, setUser } = useContext(authContext);
    const navigator = useNavigate();

    useEffect(() => {
        verified && navigator('/profile');
    }, [navigator, verified]);

    const loginHandler = (e) => {
        e.preventDefault();
        const { email, password } = e.target
        const apiUrl = process.env.REACT_APP_API_URL;
        const loginDetails =
        {
            user:
            {
                email: email.value,
                password: password.value
            }
        }
        axios
            .post(`${apiUrl}/users/login`, loginDetails)
            .then(res => {
                localStorage.setItem('token', res.headers.authorization);
                // setUser(res.body.user);
                setUser(res.data.user);
                setToken(res.headers.authorization);
                setVerified(true);
                toast.success('Anmeldung erfolgreich!');
                navigator('/profile')
            })
            .catch(err => {
                toast.error('Anmeldung nicht möglich!')
            })
    };

    return (
        <Container sx={{ my: 2 }}>
            <Card>
                <CardHeader sx={{ textAlign: 'center' }} title={'Login'} />
                <CardContent>
                    <form onSubmit={loginHandler}>
                        <FormControl sx={{ width: 1, marginY: 3 }}>
                            <InputLabel htmlFor="email">E-Mail Adresse</InputLabel>
                            <Input id="email" aria-describedby="email-helper-text" type="email" sx={{ paddingX: 2 }} />
                            <FormHelperText id="email-helper-text">Bitte trage hier deine E-Mail Adresse ein.</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ width: 1, marginY: 3 }}>
                            <InputLabel htmlFor="password">Passwort</InputLabel>
                            <Input id="password" aria-describedby="firstname-helper-text" type="password" sx={{ paddingX: 2 }}/>
                            <FormHelperText id="email-helper-text">Bitte trage hier dein Passwort ein.</FormHelperText>
                        </FormControl>
                        <Container sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="reset" variant="contained" color="error"> <RestartAlt /></Button>
                            <Button type="submit" variant="contained" color="success"> <LoginOutlined /></Button>
                        </Container>
                    </form>
                </CardContent>
            </Card>

        </Container>
    )
}

export default Login