import { KeyOutlined, Logout, PersonOutlined, RestartAlt, Save } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";
import LoaderPage from "./LoaderPage";

const Profile = () => {
    const { verified, setVerified, user, setUser, token, setToken } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        (!verified || !token) && navigate('/login');
        user && setIsLoading(false);
        setError(null);
    }, [navigate, token, user, verified]);

    const updateHandler = (e) => {
        e.preventDefault();
        const { email, firstname } = e.target;
        if (!email.value) {
            toast.warning('Bitte gib eine E-Mail Adresse ein!');
            return;
        }
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

        axios
            .put(`${apiUrl}/users/password/${user._id}`, { user: { password: password.value } }, { headers: { authorization: token } })
            .then(res => {
                console.log(res.data.user);
                setUser(res.data.user);
                toast.success('Profil erfolgreich geändert');
            })
            .catch(err => {
                toast.error('Die Änderung konnte nicht gespeichert werden!')
            });

    }

    const logoutHandler = async (e) => {
        await setVerified(false);
        await setUser(null);
        localStorage.removeItem('token');
        await setToken(null);
        navigate('/login');
        toast.success('Du wurdest erfolgreich ausgeloggt.')
    }

    if (error) { return <h3>Error...</h3> }
    if (isLoading) { return (<LoaderPage />) }

    return (
        (verified && (
            <div className="bg-white rounded-md shadow-md mb-14 z-0">
                <div className="flex flex-col justify-center items-center py-3 border-b-2 border-black text-center">
                    <h2 className="text-2xl my-3">{`Hallo ${user.firstname ? user.firstname : user.username}`}</h2>
                    {user.firstname && (<h3 className="text-xl my-2">({user.username})</h3>)}
                    <button
                        type="button"
                        onClick={logoutHandler}
                        className='flex justify-center items-center w-12 h-12 rounded-full bg-red-500 text-white shadow'>
                        <Logout /></button>
                </div>
                <div className="w-[85%] mx-auto py-3 my-3">
                    <form onSubmit={updateHandler} className='flex flex-col gap-5'>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-xs">E-Mail Adresse</label>
                            <input id="email" aria-describedby="email-helper-text" type="email" defaultValue={user.email} className='border-b-2 p-2' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fistname" className="text-xs">Vorname</label>
                            <input id="firstname" aria-describedby="firstname-helper-text border" type="text" defaultValue={user.firstname} className='border-b-2 p-2' />
                        </div>
                        <div className="flex justify-around my-3">
                            <button type="reset" className="p-2 w-20 rounded shadow bg-red-600 text-white"><PersonOutlined /> <RestartAlt /></button>
                            <button type="submit" className="p-2 w-20 rounded shadow bg-green-700 text-white"><PersonOutlined /> <Save /></button>
                        </div>
                    </form>
                </div>
                <hr className="border-black" />
                <div className="w-[85%] mx-auto py-3 my-3">
                    <form onSubmit={passwordHandler} className='flex flex-col gap-5'>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-xs">Passwort</label>
                            <input id="password" aria-describedby="password-helper-text" type="password" className='border-b-2 p-2' />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="passwordRepeat" className="text-xs">Passwort wiederholen</label>
                            <input id="passwordRepeat" aria-describedby="password-repeat-helper-text" type="password" className='border-b-2 p-2' />
                        </div>
                        <div className="flex justify-around my-3">
                            <button type="reset" className="p-2 w-20 rounded shadow bg-red-600 text-white"><KeyOutlined /> <RestartAlt /></button>
                            <button type="submit" className="p-2 w-20 rounded shadow bg-green-700 text-white"><KeyOutlined /> <Save /></button>
                        </div>
                    </form>
                </div >
            </div >
        ))
    )
}

export default Profile