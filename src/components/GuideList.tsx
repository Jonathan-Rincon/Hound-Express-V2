import React, { useState } from 'react';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateGuideStatus } from '../store/guidesSlice';

const GuideList: React.FC = () => {
    const guides = useSelector((state: RootState) => state.guides?.guides || []);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');

    const handleShowHistory = (index: number) => {
        const guide = guides[index];
        const history = guide.historial.join('\n');
        setModalContent(history);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    const handleUpdateStatus = (index: number) => {
        const flujoEstados = ['Pendiente', 'En tránsito', 'Entregado'];
        const estadoActualIndex = flujoEstados.indexOf(guides[index].estado);
        if (estadoActualIndex < flujoEstados.length - 1) {
            dispatch(updateGuideStatus({ index, status: flujoEstados[estadoActualIndex + 1] }));
        } else {
            alert('Esta guía ya está en el estado final.');
        }
    };

    return (
        <>
            <table className="main-content__table" aria-label="Lista de guías">
                <thead>
                    <tr>
                        <th scope="col">Número de Guía</th>
                        <th scope="col">Estado Actual</th>
                        <th scope="col">Origen</th>
                        <th scope="col">Destino</th>
                        <th scope="col">Última Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {guides.length > 0 ? (
                        guides.map((guide, index) => (
                            <tr key={guide.numeroGuia}>
                                <td>{guide.numeroGuia}</td>
                                <td>{guide.estado}</td>
                                <td>{guide.origen}</td>
                                <td>{guide.destino}</td>
                                <td>{guide.fecha}</td>
                                <td>
                                    <button
                                        className="main-content__button"
                                        onClick={() => handleUpdateStatus(index)}
                                        aria-label={`Actualizar estado de la guía ${guide.numeroGuia}`}
                                    >
                                        Actualizar Estado
                                    </button>
                                    <button
                                        className="main-content__button"
                                        onClick={() => handleShowHistory(index)}
                                        aria-label={`Ver historial de la guía ${guide.numeroGuia}`}
                                    >
                                        Historial
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} aria-live="polite">No hay guías disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Historial de Cambios"
            >
                <ul>
                    {modalContent.split('\n').map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </Modal>
        </>
    );
};

export default GuideList;