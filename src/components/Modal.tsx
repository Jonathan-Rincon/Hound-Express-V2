import React from 'react';

interface ModalProps {
    isOpen: boolean; // Controla si el modal está abierto
    onClose: () => void; // Función para cerrar el modal
    title: string; // Título del modal
    children: React.ReactNode; // Contenido dinámico dentro del modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // No renderizar el modal si no está abierto

    return (
        <div
            className={`modal ${isOpen ? 'modal--visible' : ''}`}
            role="dialog"
            aria-hidden={!isOpen}
            onClick={onClose}
        >
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <span className="modal__close" onClick={onClose} aria-label="Cerrar">
                    &times;
                </span>
                <h2>{title}</h2>
                <div className="modal__body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;

