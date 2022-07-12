import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const UsageTableCompanyField = ({ usage }) => {
    const { token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [company, setCompany] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
            .get(`${apiUrl}/companies/${usage.companyId}`, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                setCompany(res.data.company);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                toast.error('Die Pass Details konnten nicht geladen werden!')
            });
    }, [apiUrl, token, usage.companyId]);
    if (error) { return <td>Error...</td> }
    if (loading) { return <td>Loading...</td> }

    return (
        <td id={usage._id} className='px-1 py-3 overflow-hidden'>{company.title.substring(0, 28)}...</td>
    )
}

export default UsageTableCompanyField