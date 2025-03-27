import React from 'react';
import Logo from '../assets/Logo-Azul.png';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__banner">
                <img src={Logo} alt="Logotipo de Hound Express" className="header__logo" />
                <h1>Hound Express</h1>
                <p>¡Rastrea tus paquetes de manera sencilla y confiable!</p>
            </div>
            <nav className="header__nav">
                <ul className="header__nav--list">
                    <li><a href="#inicio" className="header__nav--link">Inicio</a></li>
                    <li><a href="#registro" className="header__nav--link">Registro de Guías</a></li>
                    <li><a href="#estado" className="header__nav--link">Estado General</a></li>
                    <li><a href="#lista" className="header__nav--link">Lista de Guías</a></li>
                    <li><a href="#buscar" className="header__nav--link">Buscar Guías</a></li>
                    <li><a href="#historial" className="header__nav--link">Historial de Guías</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
