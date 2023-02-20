import React from 'react';
import axios from 'axios';

class InputStudent extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        place:""
    }

    handleChange = (e) => {
        console.log(e.target.name , e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }
    
//addding students
    handleSubmit = () =>{
        if(this.state.firstName!== '' && this.state.lastName!== "" && this.state.place !== ""){
            axios.post('http://localhost:5000/students', this.state)
            .then(result =>{
                console.log("result=>",result)
                console.log("Successfully posted");
            })
            .catch(error =>{
                console.log("Something went wrong.", error);
            });
            this.setState({firstName: '', lastName: '', place: ''});
            window.location = '/';
        }
    }

    render() {
        return (
            <div className="container text-center">
                <div className="flex flex-row flex-wrap">
                    <br />
                    <form onSubmit={()=>this.handleSubmit()}>
                    <div className="form-group">
                            <label>First Name</label>
                            <input required
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.firstName}
                                type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="Enter First Name" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input required
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.lastName}
                                type="text"
                                name="lastName"
                                className="form-control"
                                placeholder="Enter Last Name" />
                        </div>
                        <div className="form-group">
                            <label>Place</label>
                            <input required
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.place}
                                type="text"
                                name="place"
                                className="form-control"
                                placeholder="Enter Place" />
                        </div>
                        <br />
                        <button className="btn btn-info btn-block">CREATE</button>
                    </form>

                </div>
            </div>
        );
    }
}

export default InputStudent;