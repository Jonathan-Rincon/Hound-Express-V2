import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; 2025 Hound Express. Todos los derechos reservados.</p>
            <p>
                <a href="#" className="footer__link">Política de privacidad</a> | 
                <a href="#" className="footer__link">Contacto</a>
            </p>
        </footer>
    );
};

export default Footer;
