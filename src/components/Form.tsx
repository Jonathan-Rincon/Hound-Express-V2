import React, { useState } from 'react';
import { Guide } from '../types/Guide';

interface FormProps {
    onRegister: (guide: Guide) => void;
}

const Form: React.FC<FormProps> = ({ onRegister }) => {
    const [formState, setFormState] = useState<Guide>({
        numeroGuia: '',
        origen: '',
        destino: '',
        destinatario: '',
        fecha: '',
        estado: 'Pendiente',
        historial: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.numeroGuia || !formState.origen || !formState.destino || !formState.destinatario || !formState.fecha) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        onRegister({ ...formState, historial: [`Creado con estado: ${formState.estado}`] });
        setFormState({
            numeroGuia: '',
            origen: '',
            destino: '',
            destinatario: '',
            fecha: '',
            estado: 'Pendiente',
            historial: [],
        });
    };

    return (
        <form className="main-content__form" onSubmit={handleSubmit}>
            <label className="main-content__form--label">Número de Guía:</label>
            <input name="numeroGuia" value={formState.numeroGuia} onChange={handleChange} className="main-content__form--input" />
            <label className="main-content__form--label">Origen:</label>
            <input name="origen" value={formState.origen} onChange={handleChange} className="main-content__form--input" />
            <label className="main-content__form--label">Destino:</label>
            <input name="destino" value={formState.destino} onChange={handleChange} className="main-content__form--input" />
            <label className="main-content__form--label">Destinatario:</label>
            <input name="destinatario" value={formState.destinatario} onChange={handleChange} className="main-content__form--input" />
            <label className="main-content__form--label">Fecha:</label>
            <input type="date" name="fecha" value={formState.fecha} onChange={handleChange} className="main-content__form--input" />
            <label className="main-content__form--label">Estado:</label>
            <select name="estado" value={formState.estado} onChange={handleChange} className="main-content__form--select">
                <option>Pendiente</option>
                <option>En tránsito</option>
                <option>Entregado</option>
            </select>
            <button className="main-content__form--button" type="submit">Registrar</button>
        </form>
    );
};

export default Form;
