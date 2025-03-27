import React from 'react';
import { Guide } from '../types/Guide';

interface GuideListProps {
    guides: Guide[];
    onUpdateStatus: (index: number) => void;
    onShowHistory: (index: number) => void;
}

const GuideList: React.FC<GuideListProps> = ({ guides, onUpdateStatus, onShowHistory }) => {
    return (
        <table className="main-content__table">
            <thead>
                <tr>
                    <th>Número de Guía</th>
                    <th>Estado Actual</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Última Actualización</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {guides.map((guide, index) => (
                    <tr key={guide.numeroGuia}>
                        <td>{guide.numeroGuia}</td>
                        <td>{guide.estado}</td>
                        <td>{guide.origen}</td>
                        <td>{guide.destino}</td>
                        <td>{guide.fecha}</td>
                        <td>
                            <button className="main-content__button" onClick={() => onUpdateStatus(index)}>Actualizar Estado</button>
                            <button className="main-content__button" onClick={() => onShowHistory(index)}>Historial</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default GuideList;
