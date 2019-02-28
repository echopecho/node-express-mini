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
        console.log(res.data)
        this.setState({ users: res.data })
      })
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => (
          <div>{user.name}</div>
        ))}
      </div>
    );
  }
}

export default App;
