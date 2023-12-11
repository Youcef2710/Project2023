import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { GetUserEmails } from '../../server/controllers/EmailController';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Login() {

  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  // List des utilisateurs

  const [data, setData] = useState([]);

  const changeLastName = (e) => {
    setLastName(e.target.value)
  }

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    /*axios.post('http://localhost:5000/users/create', {
      last_name: lastName,
      first_name: firstName,
      email: email
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
    setEmail('');
    setFirstName('');
    setLastName(''); */

    fetch('http://localhost:5000/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      last_name: lastName,
      first_name: firstName,
      email: email
    })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      getUserEmails(email);
    })
    .catch(error => console.error(error));

    setEmail('');
    setFirstName('');
    setLastName('');
    
    }

    const getUserEmails = (email) => {
      // Appeler la fonction GetUserEmails pour récupérer les emails de l'utilisateur
      fetch(`http://localhost:5000/emails/`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }


    const userEmail = "younesmoh@123.com";


  //  const getAllUsers = () => {

    
  
  //   axios.get(`http://localhost:5000/emails/${userEmail}`)
  //   .then(function (response) {
  //     setData(response.data)
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   });
  // }

  // useEffect(() => {
  //   getAllUsers()
  // });

  return (
    <div className="App">
      <main>
      <form>
        <div>
        <label>
          Nom
          <input type="text"  value={lastName} onChange={changeLastName}  placeholder="Votre nom" />
        </label>
        </div>
        <div>
        <label>
          Prénom
          <input type="text" value={firstName} onChange={changeFirstName}  placeholder="Votre prénom" />
        </label>
        </div>
        <div>
        <label>
          Email
          <input type="email" id="user_name"  value={email} onChange={changeEmail} placeholder="Votre email" />
        </label>
        </div>
        <button type="submit" onClick={onSubmit}>Envoyer</button>
      </form>
      <table cellSpacing={2} cellPadding={5} border={1}>
        <thead>
          <td><strong>Id</strong></td>
          <td><strong>Prénom</strong></td>
          <td><strong>Nom</strong></td>
          <td><strong>Email</strong></td>
        </thead>
      {data?.map((i) => {
                  return (
                    <tr>
                      {/* <td>{email}</td> */}
                      <td>{i._id}</td>
                      <td>{i.email_receiver}</td>
                      <td>{i.subject}</td>
                      <td>{i.content}</td>
                    </tr>
                  );
                })}
      </table>
      </main>
    </div>
  );
}

export default Login;
