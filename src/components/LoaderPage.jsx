import React from 'react'
import { RingLoader } from 'react-spinners'

const LoaderPage = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <RingLoader loading={true} size={150} />
        </div>)
}

export default LoaderPage