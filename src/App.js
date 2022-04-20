import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email);
    const user = ({ name, email })

    // post data
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  return (
    <div className="App">
      <h1>My users: {users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Name' required />
        <br />
        <input type="email" name="email" placeholder='Email' required />
        <br />
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>id: {user.id} Name: {user.name} Email: {user.email}
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
