// index.component.js

import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.onChange  = this.onChange.bind(this);
        this.onSubmit  = this.onSubmit.bind(this);
        this.state = {persons: [],
                        keyword: '',
                    };
    }
    //get event change input search textbox
    onChange(e){
        console.log(e.target.value)
        this.setState({
            keyword: e.target.value
        });
    }
    //submit keywork
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            keyword: this.state.keyword       
        };
        axios.post('http://localhost:5000/persons/search/', obj)//req search
            .then(res => {
                this.setState({persons: res.data});
            });   
    }
    componentDidMount() {
       this.reload();
       setInterval(this.getData, 190002);//set time reload 
        axios.get('http://localhost:5000/persons')
            .then(response => {
                console.log(response.data);
                this.setState({persons: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //row of person's data row
    tabRow() {
        //window.location.reload();
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i}/>;
        });
    }
    //reload page
    reload(){
        let token = localStorage.getItem("auth-token")
        console.log("token index");
        if(!token)
            this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <h3 align="center">Persons List</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.keyword}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit"
                               value="Tìm kiếm"
                               className="btn btn-primary"></input>
                    </form>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Age</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}