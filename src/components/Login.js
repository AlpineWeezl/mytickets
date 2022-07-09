import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";

const Login = () => {
    const { verified } = useContext(authContext);
    const navigator = useNavigate();

    useEffect(() => {
        verified && navigator('/profile');
        
    }, [navigator, verified]);
    return (
        <div>Login</div>
    )
}

export default Login