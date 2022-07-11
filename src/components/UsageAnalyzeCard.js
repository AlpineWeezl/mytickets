import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar"
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const UsageAnalyzeCard = ({ pass }) => {
    const { token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [usages, setUsages] = useState(null);
    const [sum, setSum] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
            .get(`${apiUrl}/usages/pass/${pass._id}`, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                setUsages(res.data.usages);
                setSum(0);
                setSum(res.data.usages.map(usage => {
                    return (parseFloat(sum) + parseFloat(usage.price));
                }));
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                toast.error('Die Pass Details konnten nicht geladen werden!')
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl, pass, token]);

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

    return (
        <div className='rounded-md shadow-md p-4 bg-white'>
            <h3 className='text-center font-bold text-xl my-3'>Kosten / Nutzen</h3>
            <div className='flex justify-center gap-3 mb-5'>
                <p>Kaufpreis:</p>
                <p>{pass.price} €</p>
            </div>

            <div className='flex justify-between gap-5'>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Genutzt</p>
                    <CircularProgressbar value={sum} maxValue={pass.price} text={`${sum} €`} />
                </div>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Übrig</p>
                    <CircularProgressbar value={pass.price - sum} maxValue={pass.price} text={`${pass.price - sum} €`} />
                </div>
            </div>
        </div>
    )
}

export default UsageAnalyzeCard