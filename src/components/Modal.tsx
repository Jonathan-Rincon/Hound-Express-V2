import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean; // Controla si el modal está abierto
    onClose: () => void; // Función para cerrar el modal
    title: string; // Título del modal
    children: React.ReactNode; // Contenido dinámico dentro del modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Evita el scroll cuando el modal está abierto
        } else {
            document.body.style.overflow = ''; // Restaura el scroll cuando el modal se cierra
        }
        return () => {
            document.body.style.overflow = ''; // Limpieza al desmontar
        };
    }, [isOpen]);

    if (!isOpen) return null; // No renderizar el modal si no está abierto

    return (
        <div
            className={`modal ${isOpen ? 'modal--visible' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="modal__close" 
                    onClick={onClose} 
                    aria-label="Cerrar ventana emergente"
                >
                    &times;
                </button>
                <h2 id="modal-title">{title}</h2>
                <div className="modal__body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;