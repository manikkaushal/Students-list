import React from 'react';
import axios from 'axios';

class ListStudent extends React.Component {
    state = {
        students: [],
        ufirstName: '',
        ulastName: '',
        uplace: '',
        uid: ''
    }
    getStudents = () => {
        axios.get('http://localhost:5000/')
            .then(result => {
                console.log(result);
                this.setState({ students: result.data });
            });
    }
    componentDidMount = () => {
        this.getStudents();
    }
    handleDelete = (id) => {
        axios.delete(`http://localhost:5000/students/delete/${id}`)
            .then(result => {
                console.log(result);
                window.location = '/';
            });
    }
    handleUpdate = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleModalUpdate = (e) => {
        axios.post(`http://localhost:5000/students/update/${this.state.uid}`, { firstName: this.state.ufirstName, lastName: this.state.ulastName, place: this.state.uplace })
            .then(result => {
                console.log(result);
                this.setState({ ufirstName: '', ulastName: '', uplace: '' })
                window.location = '/';
            })

    }
    render() {
        return (
            <div className="container">
                <br />
                <h2 className="text-center">Students</h2>
                {
                    this.state.students.map(students => (
                        <div key={students._id} className="card" style={{
                            borderRadius: '10px',
                            color: 'teal',
                            backgroundColor: 'whitesmoke',
                            padding: '15px',
                            marginLeft: '15px', marginTop: '10px',
                            display: 'inline-block'
                        }}>
                            <div className="card-body">
                                <h3>First Name: {students.firstName}</h3>
                                <h3>Last Name: {students.lastName}</h3>
                                <h3>Place: {students.place}</h3>
                                {/* <button className="btn btn-warning">Edit</button> */}
                                &nbsp;

                                <div className="container"
                                    style={{ display: 'inline' }}>


                                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={() => { this.setState({ uid: students._id, ufirstName: students.firstName, ulastName: students.lastName, uplace: students.place }) }}>UPDATE</button> &nbsp;
                                    <button
                                        onClick={() => this.handleDelete(students._id)}
                                        className="btn btn-danger">DELETE</button>


                                    <div className="modal fade" id="myModal" role="dialog">
                                        <div className="modal-dialog">


                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    <h4 className="modal-title">UPDATE</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <input
                                                        onChange={(e) => this.handleUpdate(e)}
                                                        value={this.state.ufirstName}
                                                        name="ufirstName"
                                                        className="form-control"
                                                        placeholder="Enter FirstName" /> <br />
                                                    <input
                                                        onChange={(e) => this.handleUpdate(e)}
                                                        value={this.state.ulastName}
                                                        name="ulastName"
                                                        className="form-control"
                                                        placeholder="Enter LastName" /> <br />
                                                    <input
                                                        onChange={(e) => this.handleUpdate(e)}
                                                        value={this.state.uplace}
                                                        name="uplace"
                                                        className="form-control"
                                                        placeholder="Enter Place" />
                                                </div>
                                                <div className="modal-footer">
                                                    <button className="btn btn-secondary" data-dismiss="modal" onClick={(e) => this.handleModalUpdate(e)}>UPDATE</button>
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.setState({ ufirstname: '', ulastname: '', uplace: '' }) }}>CLOSE</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ListStudent;