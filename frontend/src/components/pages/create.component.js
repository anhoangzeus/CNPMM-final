import React, {Component} from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            company: '',
            age:''
        }
    }
    //change textbox event
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }
    //submit form
    onSubmit(e) {
        e.preventDefault();
        //get token
        let token = localStorage.getItem("auth-token")
        //create object send to API
        const obj = {
            name: this.state.name,
            company: this.state.company,
            age: this.state.age,
            token: token
        };
        console.log(obj);
        axios.post('http://localhost:5000/persons/add', obj)//post req to API
            .then(res => {
                if(res.data.err)//if API check success
                {
                    localStorage.setItem("auth-token","");
                    this.props.history.push('/login');
                }
                
            });

        this.setState({//clear text
            name: '',
            company: '',
            age: ''
        })
    }
    componentDidMount() {
        let token = localStorage.getItem("auth-token")
        console.log("token index");
        if(!token)//if token null move to login page
            this.props.history.push('/login');
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Person</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name: </label>
                        <input type="text" className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name: </label>
                        <input type="text" className="form-control" value={this.state.company}
                               onChange={this.onChangeCompany}/>
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input type="text" className="form-control" value={this.state.age}
                               onChange={this.onChangeAge}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Person" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}