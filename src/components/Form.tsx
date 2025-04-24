import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGuide } from "../store/guidesSlice";
import { Guide } from "../types/Guide";

const Form: React.FC = () => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState<Guide>({
        numeroGuia: "",
        origen: "",
        destino: "",
        destinatario: "",
        fecha: "",
        estado: "Pendiente",
        historial: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.numeroGuia || !formState.origen || !formState.destino || !formState.destinatario || !formState.fecha) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        dispatch(addGuide({ ...formState, historial: [`Creado con estado: ${formState.estado}`] }));
        setFormState({
            numeroGuia: "",
            origen: "",
            destino: "",
            destinatario: "",
            fecha: "",
            estado: "Pendiente",
            historial: [],
        });
    };

    return (
        <form className="main-content__form" onSubmit={handleSubmit}>
            <label htmlFor="numeroGuia" className="main-content__form--label">Número de Guía:</label>
            <input id="numeroGuia" name="numeroGuia" value={formState.numeroGuia} onChange={handleChange} className="main-content__form--input" />

            <label htmlFor="origen" className="main-content__form--label">Origen:</label>
            <input id="origen" name="origen" value={formState.origen} onChange={handleChange} className="main-content__form--input" />

            <label htmlFor="destino" className="main-content__form--label">Destino:</label>
            <input id="destino" name="destino" value={formState.destino} onChange={handleChange} className="main-content__form--input" />

            <label htmlFor="destinatario" className="main-content__form--label">Destinatario:</label>
            <input id="destinatario" name="destinatario" value={formState.destinatario} onChange={handleChange} className="main-content__form--input" />

            <label htmlFor="fecha" className="main-content__form--label">Fecha:</label>
            <input id="fecha" type="date" name="fecha" value={formState.fecha} onChange={handleChange} className="main-content__form--input" />

            <button className="main-content__form--button" type="submit">Registrar</button>
        </form>
    );
};

export default Form;