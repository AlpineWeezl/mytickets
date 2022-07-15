import React from 'react'
import { RingLoader } from 'react-spinners'

const LoaderAnalyzeCards = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <RingLoader loading={true} size={75} />
        </div>)
}

export default LoaderAnalyzeCards