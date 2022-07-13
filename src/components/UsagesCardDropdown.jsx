import { useState } from "react"
import UsagesTable from "./UsagesTable";

const UsagesPassDropdown = ({ pass }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className={'py-2 border-b-2 text-2xl font-bold'}>{pass.title}</button>
            {
                (isOpen) && (
                    <UsagesTable pass={pass} />
                )
            }
        </>
    )
}

export default UsagesPassDropdown