import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.png'; // Asegúrate de que la ruta al logo sea correcta

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFA500' }}> {/* Color naranja */}
                        <div className="container-fluid">
                            <a href="/users" className="navbar-brand"style={{ color: 'black' }}><b>Aplicación de gestión de usuarios</b></a>
                            <div className="ml-auto">
                                <img src={logo} alt="Logo" style={{ height: '40px', marginLeft: 'auto' }} /> {/* Logo a la derecha */}
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;