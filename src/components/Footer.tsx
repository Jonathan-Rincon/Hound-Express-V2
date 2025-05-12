import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer" aria-label="Pie de página de Hound Express">
            <p>&copy; 2025 Hound Express. Todos los derechos reservados.</p>
            <nav aria-label="Enlaces legales y de contacto">
                <ul className="footer__list">
                    <li>
                        <a href="/privacidad" className="footer__link" aria-label="Leer la política de privacidad">
                            Política de privacidad
                        </a>
                    </li>
                    <li>
                        <a href="/contacto" className="footer__link" aria-label="Ir a la página de contacto">
                            Contacto
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;