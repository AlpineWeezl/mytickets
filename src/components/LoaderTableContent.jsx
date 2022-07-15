import React from 'react'
import { BeatLoader } from 'react-spinners'

const LoaderTableContent = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <BeatLoader loading={true} size={15} />
        </div>
    )
}

export default LoaderTableContent