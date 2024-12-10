import React, { Component } from 'react';
import UserService from '../services/UserService';
//import './ListUserComponent.css'; // Asegúrate de importar tu archivo CSS

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showModal: false,
            userIdToDelete: null,
        };

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    deleteUser(id) {
        UserService.deleteUser(id).then(res => {
            this.setState({ users: this.state.users.filter(user => user.id !== id) });
            this.toggleModal(); // Cerrar el modal después de eliminar
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            if (res.data == null) {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data });
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    toggleModal(userId) {
        this.setState({ showModal: !this.state.showModal, userIdToDelete: userId });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Lista de Usuarios</h2>
                <div className="row">
                    <button className="btn btn-warning" onClick={this.addUser}> <b>Añadir usuario</b></button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo electrónico</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user =>
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => this.editUser(user.id)} className="btn btn-warning">Actualizar</button>
                                        {/* Botón para abrir el modal de eliminación */}
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.toggleModal(user.id)} className="btn btn-danger">Eliminar</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.viewUser(user.id)} className="btn btn-warning">Ver</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal de confirmación */}
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
                                        {/* Llama a deleteUser con el ID del usuario a eliminar */}
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(this.state.userIdToDelete)}>Sí</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default ListUserComponent;