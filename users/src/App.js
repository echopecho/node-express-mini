import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        this.setState({ users: res.data })
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
