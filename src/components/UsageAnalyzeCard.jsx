import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar"
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";
import LoaderAnalyzeCards from "./LoaderAnalyzeCards";

const UsageAnalyzeCard = ({ pass }) => {
    const { token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPercentage, setIsPercentage] = useState(false);
    const [used, setUsed] = useState(0);
    const [usedPercent, setUsedPercent] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [remainingPercent, setRemainingPercent] = useState(0);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
            .get(`${apiUrl}/usages/pass/${pass._id}`, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                const mappedUsed = res.data.usages.map(usage => {
                    return (usage.price);
                });
                const tempUsed = mappedUsed.reduce((total, current) => { return total + current; }, 0)
                setUsed(parseFloat(tempUsed).toFixed(2));
                setUsedPercent(parseFloat((tempUsed / pass.price) * 100).toFixed(0));
                setRemaining((tempUsed <= pass.price) ? parseFloat(pass.price - tempUsed).toFixed(2) : parseFloat(0).toFixed(2));
                setRemainingPercent((tempUsed<= pass.price) ? (parseFloat(100 - ((tempUsed / pass.price) * 100)).toFixed(0)) : 0);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                toast.error('Die Pass Details konnten nicht geladen werden!')
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl, pass, token]);

    if (loading) { return <LoaderAnalyzeCards />}
    if (error) { return <h2>Error...</h2> }

    return (
        <div onClick={() => setIsPercentage(!isPercentage)} className='rounded-md shadow-md p-4 bg-white'>
            <h3 className='text-center font-bold text-xl my-3'>Kosten / Nutzen</h3>
            <div className='flex justify-center gap-3 mb-5'>
                <p>Kaufpreis:</p>
                <p>{pass.price} €</p>
            </div>

            <div className='flex justify-between gap-5'>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Genutzt</p>
                    <CircularProgressbar
                        value={used}
                        maxValue={pass.price}
                        text={isPercentage ? `${usedPercent} %` :`${used} €`}
                    />
                </div>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Rest</p>
                    <CircularProgressbar
                        value={((pass.price - used) > 0) ? (pass.price - used) : 0}
                        maxValue={pass.price}
                        minValue={0}
                        text={isPercentage ? `${remainingPercent} %` : `${remaining} €`}
                    />
                </div>
            </div>
        </div>
    )
}

export default UsageAnalyzeCard