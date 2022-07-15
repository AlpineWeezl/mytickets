import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import { useState } from "react"
import UsagesTable from "./UsagesTable";

const UsagesPassDropdown = ({ pass }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={'flex justify-center items-center gap-3 py-2 border-b-2 text-2xl font-bold'}>
                {pass.title}
                <div className="flex justify-center items-center w-8 h-8 rounded-full border-2 border-black">
                    {!isOpen ? <ArrowDropDownOutlined fontSize="large" /> : <ArrowDropUpOutlined fontSize="large" />}
                </div>
            </button>
            {
                (isOpen) && (
                    <UsagesTable pass={pass} />
                )
            }
        </>
    )
}

export default UsagesPassDropdown