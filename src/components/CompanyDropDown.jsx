import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appContext } from "../context/appContext";

const CompanyDropDown = ({ usage, selectedCompany, setSelectedCompany }) => {
	const { token, selectedAssociationId } = useContext(appContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [companies, setCompanies] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		axios
			.get(`${apiUrl}/companies/association/${selectedAssociationId}`, {
				headers: { authorization: token },
			})
			.then((res) => {
				setCompanies(res.data.companies);

				const setInitial = async (companyId) => {
					const com = await res.data.companies.find(
						(cm) => cm._id === companyId
					);
					await setSelectedCompany(com);
				};

				usage && setInitial(usage.companyId);

				setLoading(false);
			})
			.catch((err) => {
				toast.error("Gesellschaften konnten nicht geladen werden!");
				console.log(err);
				setError(err);
				setLoading(false);
			});
	}, [apiUrl, navigate, selectedAssociationId, setSelectedCompany, token, usage]);

	const toggleOpenHandler = () => {
		setIsOpen(!isOpen);
	};

	const selectCompanyHandler = async (e) => {
		const { id } = e.target;
		await axios
			.get(`${apiUrl}/companies/${id}`, {
				headers: { authorization: token },
			})
			.then((res) => {
				setSelectedCompany(res.data.company);
			})
			.catch((err) => {
				toast.error("Die Gesellschaft konnte nicht gesetzt werden!");
				console.log(err);
				setLoading(false);
			});
		setIsOpen(false);
	};

	if (error) {
		return <h3>Error...</h3>;
	}
	if (loading) {
		return <h3>Loading...</h3>;
	}

	return (
		<div className="flex flex-col pb-5">
			<button
				onClick={toggleOpenHandler}
				className="flex p-4 border rounded justify-center items-center"
			>
				{selectedCompany
					? selectedCompany.title
					: "Bitte wähle eine Gesellschaft aus"}
				{!isOpen ? <ArrowDropDown /> : <ArrowDropUp />}
			</button>
			<div>
				<div
					className="absolute w-[85%] border shadow-md rounded-md bg-white divide-y h-[70vh] overflow-y-scroll"
					hidden={!isOpen}
				>
					{companies &&
						companies.map((company, i) => {
							return (
								<button
									id={company._id}
									key={company._id}
									onClick={selectCompanyHandler}
									className={`w-full p-3 ${
										i % 2 === 0 && "bg-slate-100"
									}`}
								>
									{company.title}
								</button>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default CompanyDropDown;
