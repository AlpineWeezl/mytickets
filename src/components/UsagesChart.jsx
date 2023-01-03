import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { toast } from "react-toastify";
import { appContext } from "../context/appContext";
import LoaderPage from "./LoaderPage";

const UsagesChart = ({ pass }) => {
	const { token } = useContext(appContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [usages, setUsages] = useState(null);
	const [companies, setCompanies] = useState(null);
	const [numBest, setNumBest] = useState(3);
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		axios
			.get(`${apiUrl}/companies`, {
				headers: { authorization: token },
			})
			.then((res) => {
				setCompanies(res.data.companies);
			})
			.catch((err) => {
				toast.error("Das Diagramm konnte nicht erstellt werden!");
				console.log(err);
				setError(err);
				setLoading(false);
			});
		axios
			.get(`${apiUrl}/usages/pass/${pass._id}`, {
				headers: { authorization: token },
			})
			.then((res) => {
				setUsages(res.data.usages);
				setLoading(false);
			})
			.catch((err) => {
				toast.error("Das Diagramm konnte nicht erstellt werden!");
				console.log(err);
				setError(err);
				setLoading(false);
			});
	}, [apiUrl, pass, token]);

	if (!companies && loading) {
		return <LoaderPage />;
	}

	if (error) {
		return <h2>Error...</h2>;
	}

	let bestCompanies;
	if (companies && !loading) {
		const companyValue = companies.map((company) => {
			const companyUsages = usages.filter((usage) => {
				return usage.companyId === company._id;
			});
			const valuePerCompanyAndUsage = companyUsages.map((cmpnyUsg) => {
				return cmpnyUsg.price;
			});

			const reducedValue = valuePerCompanyAndUsage.reduce(
				(curr, prev) => {
					return curr + prev;
				},
				0
			);
			return { label: company.title, value: reducedValue };
		});

		const sortedCompanies = companyValue.sort((a, b) => {
			return b.value - a.value;
		});

		const chartLabels = sortedCompanies.map((cmpny) => {
			return cmpny.label;
		});

		const chartData = sortedCompanies.map((cmpny) => {
			return cmpny.value;
		});

		bestCompanies = {
			labels: chartLabels.splice(0, numBest),
			datasets: [
				{
					data: chartData.splice(0, numBest),
					backgroundColor: [
						"rgba(255, 99, 132, 0.7)",
						"rgba(54, 162, 235, 0.7)",
						"rgba(255, 206, 86, 0.7)",
						"rgba(75, 192, 192, 0.7",
						"rgba(153, 102, 255, 0.7)",
						"rgba(255, 159, 64, 0.7)",
						"rgba(163, 192, 86, 0.7)",
						"rgba(192, 64, 255, 0.7)",
						"rgba(162, 54, 99, 0.7)",
						"rgba(64, 236, 123, 0.7)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
						"rgba(163, 192, 86, 1)",
						"rgba(192, 64, 255, 1)",
						"rgba(162, 54, 99, 1)",
						"rgba(64, 236, 123, 1)",
					],
					borderWidth: 1,
				},
			],
		};
	}

	return (
		<div>
			<>
				{bestCompanies && (
					<Chart type="pie" data={bestCompanies} height={"50%"} />
				)}
				<select
					onChange={(e) => setNumBest(e.target.value)}
					name="noBest"
					id="noBest"
					className="p-2 text-right m-3"
				>
					<option value="3">3</option>
					<option value="5">5</option>
					<option value="7">7</option>
					<option value="10">10</option>
				</select>
			</>
		</div>
	);
};

export default UsagesChart;
