import { format, parseISO } from "date-fns"
import { useEffect, useState } from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import { toast } from "react-toastify";


const TimeAnalyzeCard = ({ pass }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const loadTimeData = async () => {
            try {
                const { begin, end } = pass;
                const calculatedTimeProgress = Math.round((new Date(end) - new Date()) / (new Date(end) - new Date(begin)) * 10000, 2) / 100;
                (calculatedTimeProgress < 0) && setTimeProgress(0);
                (calculatedTimeProgress > 100) && setTimeProgress(100);
                (calculatedTimeProgress >= 0 && calculatedTimeProgress <= 100) && setTimeProgress(timeProgress);
                (new Date() > new Date(end)) && setDaysLeft(0);
                (new Date() < new Date(begin)) && setDaysLeft(Math.round(new Date(end) - new Date(begin) / (3600 * 24 * 1000)));
                (new Date() >= new Date(begin) && new Date() <= new Date(end)) && setDaysLeft(Math.round((new Date(end) - new Date()) / (3600 * 24 * 1000)));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(err);
                toast.error('Die Benutzungen konnten nicht geladen werden!');
            }
        }
        loadTimeData();

    }, [pass, timeProgress]);

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

    return (
        <div className='rounded-md shadow-md p-4 bg-white'>
            <h3 className='text-center font-bold text-xl my-3'>Zeitraum</h3>
            <div className='flex justify-center gap-3 mb-5'>
                <p>{format(parseISO(pass.begin), 'yyyy-MM-dd')}</p>
                <p> - </p>
                <p>{format(parseISO(pass.end), 'yyyy-MM-dd')}</p>
            </div>
            <div className='flex justify-evenly gap-3 text-left'>
            </div>
            <div className='flex justify-between gap-5'>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Vergangen</p>
                    <CircularProgressbar value={timeProgress} text={`${timeProgress} %`} />
                </div>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Übrig</p>
                    <CircularProgressbar value={100 - timeProgress} text={`${daysLeft} T`} />
                </div>
            </div>
        </div>
    )
}

export default TimeAnalyzeCard