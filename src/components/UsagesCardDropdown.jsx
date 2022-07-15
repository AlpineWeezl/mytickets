import {
	ArrowDropDownOutlined,
	ArrowDropUpOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import UsagesChart from "./UsagesChart";
import UsagesTable from "./UsagesTable";

const UsagesPassDropdown = ({ pass }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex justify-center items-center gap-3 py-3 border-b-2 text-2xl font-bold bg-white"
			>
				{pass.title}
				<div className="flex justify-center items-center w-8 h-8 rounded-full border-2 border-black">
					{!isOpen ? (
						<ArrowDropDownOutlined fontSize="large" />
					) : (
						<ArrowDropUpOutlined fontSize="large" />
					)}
				</div>
			</button>
			{isOpen && (
				<>
					<UsagesChart pass={pass} />
					<UsagesTable pass={pass} />
				</>
			)}
		</>
	);
};

export default UsagesPassDropdown;
