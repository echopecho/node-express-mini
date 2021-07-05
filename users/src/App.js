import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import UserCard from './components/UserCard';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      updateID: null
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        this.setState({ users: res.data })
      })
  }

  setUpdateID = id => {
    this.setState({ updateID: id });
  }

  addUser = newUser => {
    let newState = this.state.users;

    axios.post('http://localhost:8000/api/users', newUser)
      .then(response => {
        newState.push(response.data);
        this.setState({ users: newState });
      })
  }

  updateUser = (newUser, id) => {
    let newState = this.state.users;

    axios.put(`http://localhost:8000/api/users/${id}`, newUser)
      .then(response => {
        newState.map(user => {
          if(user.id === id) {
            return { ...user, name: response.data.name, bio: response.data.bio }
          } else {
            return { ...user }
          }
        })

        this.setState({ 
          users: newState,
          updateID: null
        });
      })
  }

  deleteUser = id => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(() => {
        let newUsers = this.state.users.filter(user => user.id !== id);
        this.setState({ users: newUsers })
      })
  }

  render() {
    return (
      <div className="App">
        <Form 
          addUser={this.addUser} 
          updateUser={this.updateUser} 
          update={this.state.updateID}
        />
        {this.state.users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            deleteUser={this.deleteUser}
            updateUser={this.setUpdateID}
          />
        ))}
      </div>
    );
  }
}

export default App;
