// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany  = this.onChangeCompany.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            company: '',
            age:''
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("auth-token");
        if(!token)//if token null move to login page
            this.props.history.push('/login');
        axios.get('http://localhost:5000/persons/edit/'+this.props.match.params.id,{headers: {"x-auth-token": token}})//get data person want edit
            .then(response => {
                this.setState({
                    name: response.data.name,
                    company: response.data.company,
                    age: response.data.age });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //get evnt change text
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }
    //submit action change info
    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem("auth-token");
        const obj = {
            name: this.state.name,
            company: this.state.company,
            age: this.state.age,
            token:token
        };
        axios.post('http://localhost:5000/persons/update/'+this.props.match.params.id, obj)//post req to change info
            .then(res => console.log(res.data));

        this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update Person Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.company}
                               onChange={this.onChangeCompany}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.age}
                               onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Update Person Info"
                               className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}