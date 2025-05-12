import React from 'react';
import Logo from '../assets/Logo-Azul.png';

const Header: React.FC = () => {
    return (
        <header className="header" aria-label="Encabezado principal de Hound Express">
            <div className="header__banner">
                <img 
                    src={Logo} 
                    alt="Logotipo de Hound Express" 
                    className="header__logo" 
                    aria-hidden="true" 
                />
                <h1>Hound Express</h1>
                <p>¡Rastrea tus paquetes de manera sencilla y confiable!</p>
            </div>
            <nav className="header__nav" aria-label="Menú de navegación">
                <ul className="header__nav--list">
                    <li><a href="#inicio" className="header__nav--link" aria-label="Ir a la sección de inicio">Inicio</a></li>
                    <li><a href="#registro" className="header__nav--link" aria-label="Ir a la sección de registro de guías">Registro de Guías</a></li>
                    <li><a href="#estado" className="header__nav--link" aria-label="Consultar estado general de las guías">Estado General</a></li>
                    <li><a href="#lista" className="header__nav--link" aria-label="Ver lista completa de guías">Lista de Guías</a></li>
                    <li><a href="#buscar" className="header__nav--link" aria-label="Buscar una guía específica">Buscar Guías</a></li>
                    <li><a href="#historial" className="header__nav--link" aria-label="Consultar historial de guías">Historial de Guías</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;