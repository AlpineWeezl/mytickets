import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
    const imgPlaceholder = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.schuler-rohstoff.de%2Fwp-content%2Fuploads%2F2015%2F09%2Fplatzhalter.jpg&f=1&nofb=1'
    const apiUrl = process.env.REACT_APP_API_URL;
    const [processing, setProcessing] = useState(true);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [searchString, setSearchString] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [verified, setVerified] = useState(false);
    const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios
                .get(`${apiUrl}/users/auth`,
                    {
                        headers:
                        {
                            'authorization': token
                        }
                    }
                )
                .then(res => {
                    setUserId(res.data.user._id);
                    setVerified(true);
                    axios
                        .get(`${apiUrl}/users/${res.data.user._id}`, { headers: { authorization: token } })
                        .then(res => {
                            setUser(res.data.user)
                            setProcessing(false);
                        })
                        .catch(err => toast.error('Fehler'));
                })
                .catch(err => {
                    setVerified(false);
                    setProcessing(false);
                    toast.error('Auth Fehler')
                });
        } else {
            setProcessing(false);
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl]);

    if (!processing) {
        return (
            <authContext.Provider value={{ setVerified, verified, setUserId, userId, user, setUser, token, setToken, imgPlaceholder, searchString, setSearchString, dateFormat, setDateFormat }}>
                {children}
            </authContext.Provider>
        );
    }
};

export default AuthProvider;