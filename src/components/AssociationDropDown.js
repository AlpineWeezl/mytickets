import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const AssociationDropDown = ({ pass, setSelectedAssociation }) => {
    const { dateFormat, verified, token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [associations, setAssociations] = useState(null);
    const { usageId } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        !verified && navigate('/login');
        if (pass) {
            axios
                .get(`${apiUrl}/associations/`, { headers: { authorization: token } })
                .then(res => {
                    console.log(res.data);
                    setAssociations(res.data.associations);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error('Die Nutzung konnte nicht geladen werden!');
                    console.log(err);
                    setError(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [apiUrl, navigate, pass, token, usageId, verified]);

    return (
        <div>AssociationDropDown</div>
    )
}

export default AssociationDropDown