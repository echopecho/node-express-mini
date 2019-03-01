import React from 'react';

import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: "",
      bioText: ""
    }
  }

  componentDidUpdate() {
    if(this.props.update) {
      axios.get(`http://localhost:8000/api/users/${this.props.update}`)
        .then(response => {
          if(this.state.nameText === "" || this.state.bioText === "") {
            this.setState({ 
              nameText: response.data.name,
              bioText: response.data.bio
            })
          }
        })
    }
  }

  componentWillReceiveProps() {
    if(!this.props.update){
      this.setState({ 
        nameText: '',
        bioText: ''
      })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitUser = e => {
    e.preventDefault();
    let newUser = {
      name: this.state.nameText,
      bio: this.state.bioText
    };
    if(this.props.update) {
      this.props.updateUser(newUser, this.props.update)
      
    } else {
      this.props.addUser(newUser);
    }
    this.setState({
      nameText: '',
      bioText: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitUser}>
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
          <button type="submit">{this.props.update ? "Update User" : "Add User"}</button>
        </form>
      </div>
    )
  }
}

export default Form;