import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { appContext } from "../context/appContext";
import LoaderTableContent from "./LoaderTableContent";

const UsageTableCompanyField = ({ usage }) => {
	const { token } = useContext(appContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [company, setCompany] = useState(null);
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		axios
			.get(`${apiUrl}/companies/${usage.companyId}`, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				setCompany(res.data.company);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				toast.error("Die Pass Details konnten nicht geladen werden!");
			});
	}, [apiUrl, token, usage.companyId]);

	if (loading) {
		return <LoaderTableContent />;
	}
	if (error) {
		return <td>Error...</td>;
	}

	return (
		<td id={usage._id} className="px-1 py-3 overflow-hidden">
			{loading ? (
				<LoaderTableContent />
			) : (
				<>
					{company.title.substring(0, 24)}
					{company.title.length > 24 && "..."}
				</>
			)}
		</td>
	);
};

export default UsageTableCompanyField;
