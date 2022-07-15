import { format, parseISO } from "date-fns"
import { useEffect, useState } from "react"
import { CircularProgressbar } from "react-circular-progressbar"

const TimeAnalyzeCard = ({ pass }) => {
    const { begin, end } = pass;

    const [isPercentage, setIsPercentage] = useState(false);
    const [timeProgress, setTimeProgress] = useState(0);
    const [remainingDays, setRemainingDays] = useState(0);
    const [goneDays, setGoneDays] = useState(0);

    useEffect(() => {
        const calculatedTimeProgress = Math.round((new Date(end) - new Date()) / (new Date(end) - new Date(begin)) * 10000, 2) / 100;
        (calculatedTimeProgress < 0) && setTimeProgress(0);
        (calculatedTimeProgress > 100) && setTimeProgress(100);
        (calculatedTimeProgress >= 0 && calculatedTimeProgress <= 100) && setTimeProgress(calculatedTimeProgress);
        if (new Date() > new Date(end)) {
            setGoneDays(Math.round(new Date(end) - new Date(begin) / (3600 * 24 * 1000)));
            setRemainingDays(0);
        }
        if (new Date() < new Date(begin)) {
            setGoneDays(0);
            setRemainingDays(Math.round(new Date(end) - new Date(begin) / (3600 * 24 * 1000)));
        }
        if (new Date() >= new Date(begin) && new Date() <= new Date(end)) {
            setRemainingDays(Math.round((new Date(end) - new Date()) / (3600 * 24 * 1000)));
            setGoneDays(Math.round((new Date(end) - new Date(begin) - (new Date(end) - new Date())) / (3600 * 24 * 1000)));
        }


    }, [begin, end])

    return (
        <div onClick={() => setIsPercentage(!isPercentage)} className='rounded-md shadow-md p-4 bg-white'>
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
                    <CircularProgressbar value={timeProgress} text={isPercentage ? `${timeProgress} %` : `${remainingDays} T`} />
                </div>
                <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                    <p>Übrig</p>
                    <CircularProgressbar value={100 - timeProgress} text={isPercentage ? `${100 - timeProgress} %` : `${goneDays} T`} />
                </div>
            </div>
        </div>
    )
}

export default TimeAnalyzeCard