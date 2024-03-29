import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appContext } from "../context/appContext";
import LoaderPage from "./LoaderPage";
import UsagesPassDropdown from "./UsagesCardDropdown";

const UsagesOverview = () => {
	const { user, verified, token } = useContext(appContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [passes, setPasses] = useState(null);
	const navigate = useNavigate();

	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		!verified && navigate("/login");
		axios
			.get(`${apiUrl}/passes/user/${user._id}`, {
				headers: { authorization: token },
			})
			.then((res) => {
				setPasses(res.data.passes);
				setLoading(false);
			})
			.catch((err) => {
				toast.error("Die Nutzungen konnte nicht geladen werden!");
				console.log(err);
				setError(err);
				setLoading(false);
			});
	}, [apiUrl, navigate, token, user, verified]);

	if (error) {
		return <h3>Error...</h3>;
	}
	if (loading) {
		return <LoaderPage />;
	}

	return (
		<div className="flex flex-col bg-slate-100">
			{passes.map((pass) => {
				return <UsagesPassDropdown key={pass._id} pass={pass} />;
			})}
		</div>
	);
};

export default UsagesOverview;
