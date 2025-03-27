import React, { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import GuideList from './components/GuideList';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { Guide } from './types/Guide';
import './styles/styles.css';

const App: React.FC = () => {
    const [guides, setGuides] = useState<Guide[]>([]);

    // Estado para controlar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string>(''); // Contenido dinámico del modal

    // Función para registrar una nueva guía
    const handleRegisterGuide = (newGuide: Guide) => {
        if (guides.some(guide => guide.numeroGuia === newGuide.numeroGuia)) {
            alert('El número de guía ya existe. Por favor, ingresa uno único.');
            return;
        }
        setGuides([...guides, newGuide]);
    };

    // Función para actualizar el estado de una guía
    const handleUpdateStatus = (index: number) => {
        const updatedGuides = [...guides];
        const guide = updatedGuides[index];
        const flujoEstados = ['Pendiente', 'En tránsito', 'Entregado'];
        const estadoActualIndex = flujoEstados.indexOf(guide.estado);

        if (estadoActualIndex < flujoEstados.length - 1) {
            guide.estado = flujoEstados[estadoActualIndex + 1];
            guide.historial.push(`Actualizado a: ${guide.estado} - ${new Date().toLocaleString()}`);
            setGuides(updatedGuides);
        } else {
            alert('Esta guía ya está en el estado final.');
        }
    };

    // Función para mostrar el historial en el modal
    const handleShowHistory = (index: number) => {
        const guide = guides[index];
        const history = guide.historial.join('\n');
        setModalContent(history); // Actualizamos el contenido del modal
        setIsModalOpen(true); // Abrimos el modal
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <div>
            <Header />
            <main className="main-content">
                <section id="registro" className='main-content__registro'>
                    <h2>Registro de Guías</h2>
                    <Form onRegister={handleRegisterGuide} />
                </section>
                <section id="estado">
                    <h2>Estado General</h2>
                    <p>Total de Guías Activas: {guides.length}</p>
                    <p>Guías en Tránsito: {guides.filter(guide => guide.estado === 'En tránsito').length}</p>
                    <p>Guías Entregadas: {guides.filter(guide => guide.estado === 'Entregado').length}</p>
                </section>
                <section id="lista">
                    <h2>Lista de Guías</h2>
                    <GuideList 
                        guides={guides} 
                        onUpdateStatus={handleUpdateStatus} 
                        onShowHistory={handleShowHistory} 
                    />
                </section>
            </main>

            {/* Modal para mostrar el historial */}
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
            <Footer />
        </div>
    );
};

export default App;
