import React from 'react';
import { Guide } from '../types/Guide';

interface PanelProps {
    guides: Guide[];
}

const Panel: React.FC<PanelProps> = ({ guides }) => {
    // Calcular los contadores con base en los estados de las guías
    const totalGuias = guides.length;
    const guiasEnTransito = guides.filter(guide => guide.estado === 'En tránsito').length;
    const guiasEntregadas = guides.filter(guide => guide.estado === 'Entregado').length;

    return (
        <section className="main-content__estado">
            <h2>Estado General</h2>
            <p>Total de Guías Activas: <span>{totalGuias}</span></p>
            <p>Guías en Tránsito: <span>{guiasEnTransito}</span></p>
            <p>Guías Entregadas: <span>{guiasEntregadas}</span></p>
        </section>
    );
};

export default Panel;
