import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {

  const [usersList, setUsersList] = useState([]);

  const addUserToList = (uName, uAge) =>{
    
    setUsersList((prevState)=>{
      return [...prevState, {name: uName, age: uAge, id: Math.random().toString()} ]
    })

  }


  return (
    <div>
      <AddUser onAddUser={addUserToList} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
