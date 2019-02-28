import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      nameText: "",
      bioText: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        this.setState({ users: res.data })
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addUser = e => {
    e.preventDefault();
    let newUser = {
      name: this.state.nameText,
      bio: this.state.bioText
    }
    let newState = this.state.users;

    axios.post('http://localhost:8000/api/users', newUser)
      .then(response => {
        console.log(response.data)
        newState.push(response.data);
        this.setState({ users: newState });
      })
  }

  deleteUser = id => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(() => {
        let newUsers = this.state.users.filter(user => user.id !== id);
        this.setState({ users: newUsers})
      })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.addUser}>
          <input 
            type="text"
            name="nameText"
            value={this.state.nameText}
            onChange={this.handleChange}
            placeholder="Enter name"
          >
          </input>
          <input 
            type="text"
            name="bioText"
            value={this.state.bioText}
            onChange={this.handleChange}
            placeholder="Enter bio"
          >
          </input>
          <button type="submit">Add user</button>
        </form>
        {this.state.users.map(user => (
          <div key={user.id}>
            <p>{user.name}</p>
            <button onClick={() => this.deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
