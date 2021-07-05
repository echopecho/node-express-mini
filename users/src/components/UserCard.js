import React from 'react';

const UserCard = props => {
  return (
    <div>
      <h3>{props.user.name}</h3>
      <p>{props.user.bio}</p>
      <button onClick={() => props.deleteUser(props.user.id)}>Delete</button>
      <button onClick={() => props.updateUser(props.user.id)}>Update</button>
    </div>
  )
}

export default UserCard;