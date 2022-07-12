import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const AssociationDropDown = ({ pass, selectedAssociation, setSelectedAssociation }) => {
    const { token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [associations, setAssociations] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
            .get(`${apiUrl}/associations`, { headers: { authorization: token } })
            .then(res => {
                setAssociations(res.data.associations);
                const setInitial = async (associationId) => {
                    const association = await res.data.associations.find(ass => ass._id === associationId);
                    await setSelectedAssociation(association);
                }
                pass && setInitial(pass.associationId);
                setLoading(false);
            })
            .catch(err => {
                toast.error('Verbünde konnten nicht geladen werden!');
                console.log(err);
                setError(err);
                setLoading(false);
            });
    }, [apiUrl, navigate, pass, setSelectedAssociation, token]);

    const toggleOpenHandler = () => {
        setIsOpen(!isOpen);
    }

    const selectAssociationHandler = async (e) => {
        const { id } = e.target;
        await axios
            .get(`${apiUrl}/associations/${id}`, { headers: { authorization: token } })
            .then(res => {
                setSelectedAssociation(res.data.association);
            })
            .catch(err => {
                toast.error('Die Verbünde konnte nicht gesetzt werden!');
                console.log(err);
                setLoading(false);
            });
        setIsOpen(false);
    }

    if (error) { return <h3>Error...</h3> }
    if (loading) { return <h3>Loading...</h3> }

    return (
        <div className="flex flex-col pt-5">
            <button onClick={toggleOpenHandler} className="flex p-4 border rounded justify-center items-center shadow-md">
                {selectedAssociation ? selectedAssociation.title : 'Bitte wähle einen Verbund aus'}
                {!isOpen ? <ArrowDropDown /> : <ArrowDropUp />}
            </button>
            <div>
                <div className="absolute w-[85%] border shadow-md rounded-md bg-white divide-y max-h-[70vh] overflow-y-scroll" hidden={!isOpen}>
                    {
                        associations && associations.map((association, i) => {
                            return <button
                                id={association._id}
                                key={association._id}
                                onClick={selectAssociationHandler}
                                className={`w-full p-3 ${(i % 2 === 0 && 'bg-slate-100')}`}
                            >
                                {association.title}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AssociationDropDown;