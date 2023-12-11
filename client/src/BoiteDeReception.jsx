//import logo from './logo.svg';
// import '.././App.css';
import axios from 'axios';
import { React, useEffect, useState } from 'react';

function Boite() {



  const [email_sender, setEmailSender] = useState('');
  const [email_receiver, setEmailReceiver] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  // List des emails

  const [data, setData] = useState([]);

  const changeEmailSender = (e) => {
    setEmailSender(e.target.value)
  }

  const changeEmailReceiver = (e) => {
    setEmailReceiver(e.target.value)
  }

  const changeSubject = (e) => {
    setSubject(e.target.value)
  }

  const changeContent = (e) => {
    setContent(e.target.value)
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

    fetch('http://localhost:5000/emails/send-email/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_receiver: email_receiver,
      email_sender: email_sender,
      subject: subject, //le body de la requete http a envoyer proviennent des données introduites dans le formulaire
      content: content
    })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    setEmailSender('');
    setEmailReceiver('');
    setSubject('');
    setContent('');
    
    }

  const getAllUsers = () => {

    
  
    axios.get('http://localhost:5000/emails/')
    .then(function (response) {
      setData(response.data)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  useEffect(() => {
    getAllUsers()
  });

  return (
    <div className="App">
      <main>
      <form>
        <div>
        <label>
          e-mail_sender
          <input type="email" value={email_sender} onChange={changeEmailSender}  placeholder="e-mail_sender" />
        </label>
        </div>
        <div>
        <label>
          e-mail_receiver
          <input type="email"  value={email_receiver} onChange={changeEmailReceiver}  placeholder="e-mail_receiver" />
        </label>
        </div>
        <div>
        <label>
          subject
          <input type="text" value={subject} onChange={changeSubject}  placeholder="subject" />
        </label>
        </div>
        <div>
        <label>
          content
          <input type="text" value={content} onChange={changeContent} placeholder="content" />
        </label>
        </div>
        <button type="submit" onClick={onSubmit}>Envoyer</button>
      </form>
      <table cellSpacing={2} cellPadding={5} border={1}>
        <thead>
        <td><strong>id</strong></td>
          <td><strong>email_sender</strong></td>
          <td><strong>email_receiver</strong></td>
          <td><strong>subject</strong></td>
          <td><strong>content</strong></td>
        </thead>
      {data?.map((i) => {
                  return (
                    <tr>
                      <td>{i._id}</td>
                      <td>{i.email_sender}</td>
                      <td>{i.email_receiver}</td>
                      <td>{i.subject}</td>
                      <td>{i._content}</td>
                    </tr>
                  );

                })}
      </table>
      </main>
    </div>
  );
}

export default Boite;
