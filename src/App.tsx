import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import GuideList from './components/GuideList';
import Footer from './components/Footer';
import Panel from './components/Panel';
import './styles/styles.css';

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="main-content">
                <section id="registro" className="main-content__registro">
                    <h2>Registro de Guías</h2>
                    <Form />
                </section>
                <Panel />
                <section id="lista">
                    <h2>Lista de Guías</h2>
                    <GuideList />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default App;
