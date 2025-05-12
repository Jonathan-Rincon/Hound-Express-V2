import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Panel: React.FC = () => {
    const guides = useSelector((state: RootState) => state.guides.guides);

    const totalGuias = guides.length;
    const guiasEnTransito = guides.filter(guide => guide.estado === 'En tránsito').length;
    const guiasEntregadas = guides.filter(guide => guide.estado === 'Entregado').length;

    return (
        <section className="main-content__estado" aria-labelledby="estado-general">
            <h2 id="estado-general">Estado General de Guías</h2>
            <p>Total de Guías Activas: <span aria-live="polite">{totalGuias}</span></p>
            <p>Guías en Tránsito: <span aria-live="polite">{guiasEnTransito}</span></p>
            <p>Guías Entregadas: <span aria-live="polite">{guiasEntregadas}</span></p>
        </section>
    );
};

export default Panel;