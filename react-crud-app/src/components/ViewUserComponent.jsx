import React, { Component } from 'react';
import UserService from '../services/UserService';
import { withRouter } from 'react-router-dom';
//import './ViewUserComponent.css'; // Asegúrate de importar tu archivo CSS

class ViewUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            user: {},
            showModal: false // Estado para controlar la visibilidad del modal
        };

        // Bind the methods to the class
        this.handleBack = this.handleBack.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then(res => {
            this.setState({ user: res.data });
        });
    }

    handleBack() {
        this.props.history.push('/users');
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleDelete() {
        UserService.EliminarPRod(this.state.id).then(res => {
            // Redirigir después de eliminar
            this.toggleModal(); // Cerrar el modal
            this.props.history.push('/users'); // Volver a la lista de usuarios
        }).catch(error => {
            console.error("Error al eliminar el usuario:", error);
            // Manejar errores si es necesario
        });
    }

    render() {
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">Ver detalles del usuario</h3>
                    <div className="card-body">
                        <div className="row">
                            <label><b>Nombres: </b></label>
                            <div>{this.state.user.firstName}</div>
                        </div>
                        <div className="row">
                            <label><b>Apellidos: </b></label>
                            <div>{this.state.user.lastName}</div>
                        </div>
                        <div className="row">
                            <label><b>Correo electrónico: </b></label>
                            <div>{this.state.user.email}</div>
                        </div>
                        {/* Botón de retorno */}
                        <button onClick={this.handleBack} className="btn btn-warning">Volver a la lista</button>
                        {/* Botón de eliminar */}
                        <button onClick={this.toggleModal} className="btn btn-danger ml-2">Eliminar</button>

                        {/* Overlay para hacer el fondo opaco */}
                        {this.state.showModal && (
                            <>
                                <div className="overlay" onClick={this.toggleModal}></div> {/* Cierra el modal al hacer clic en el overlay */}
                                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Confirmar Eliminación</h5>
                                                <button type="button" className="close" onClick={this.toggleModal}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>¿Estás seguro que quieres eliminar a este usuario?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={this.toggleModal}>No</button>
                                                <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Sí</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewUserComponent);