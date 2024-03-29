import { Add } from "@mui/icons-material";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appContext } from "../context/appContext";
import LoaderPage from "./LoaderPage";
import LoaderTableContent from "./LoaderTableContent";
import UsageTableCompanyField from "./UsageTableCompanyField";

const UsagesTable = ({ newUsageHandler, pass }) => {
	const { token } = useContext(appContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [usages, setUsages] = useState(null);
	const navigate = useNavigate();
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		axios
			.get(`${apiUrl}/usages/pass/${pass._id}`, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				setUsages(res.data.usages);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				toast.error("Die Pass Details konnten nicht geladen werden!");
			});
	}, [apiUrl, navigate, pass, token]);

	const usageDetailHandler = (e) => {
		const { id } = e.target;
		navigate(`/usages/edit/${id}`);
	};

	if (loading) {
		return <LoaderPage />;
	}
	if (error) {
		return <h2>Error...</h2>;
	}

	return (
		<>
			<div className="rounded-md shadow-md bg-white">
				<div className="flex justify-between p-2 items-center">
					<div className="w-10 h-10"></div>
					<h3 className="text-center font-bold text-xl my-3">
						Nutzungen ({usages.length})
					</h3>
					<button
						type="button"
						onClick={newUsageHandler}
						className="w-10 h-10 flex justify-center items-center rounded-full shadow-md text-white bg-blue-500 text-4xl"
					>
						<Add />
					</button>
				</div>
				<div className="flex clex justify-center gap-3">
					<table className="table-auto min-w-full rounded-t-xl">
						<thead className="bg-slate-200 border-b-4 rounded-lg text-left">
							<tr>
								<th className="py-3 pl-2">Datum</th>
								<th className="py-3">Gesellschaft</th>
								<th className="py-3 pr-2 text-right">Preis</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							{usages.map((usage, i) => {
								return (
									<tr
										key={usage._id}
										id={usage._id}
										onClick={usageDetailHandler}
										className={`border-b ${
											i % 2 !== 0 && "bg-slate-50"
										}`}
									>
										<td
											id={usage._id}
											name={usage._id}
											className="pl-2"
										>
											{format(
												parseISO(usage.date),
												"yyyy-MM-dd"
											) || <LoaderTableContent />}
										</td>
										<UsageTableCompanyField usage={usage} />
										<td
											id={usage._id}
											name={usage._id}
											className="text-right pr-2"
										>
											{parseFloat(usage.price).toFixed(
												2
											) || <LoaderTableContent />}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default UsagesTable;
