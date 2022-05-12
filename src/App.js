import { AddUser } from './components/AddUser';
import { useEffect, useState } from 'react';
import User from './components/User';
import './App.css';

function App() {

  const [contacts,setContacts] = useState([]);

  // use Effect will be called once after the page gets refreshed as we specify an empty brackets and useEffect calls fetchUrl. 
  useEffect(()=>{
    fetchUrl();
  },[])

  // In fetchurl we call an api to fetch the contacts, convert to json format and setcontacts 
  const fetchUrl = async()=>{
    const url = `https://jsonplaceholder.typicode.com/users/`;
    await fetch(url)
    .then((res)=>res.json())
    .then((data)=>setContacts(data))
  }



  const fetchUser = async(name,email)=>{
    // We fetch the url and then in the body we put the name and email from the input we got and then from the response we convert to json and append the data in contacts.
      const url = 'https://jsonplaceholder.typicode.com/users';
      await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((data) => {setContacts((contacts)=>[...contacts,data])});
  }

  const onhandleDelete = async(id)=>{
    // We get the id that we want to delete and fetch the url with the id and then filter out that id from the contacts.
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
    }).then((response)=>{
      if(response.status !== 200){
        return;
      }
      else{
        setContacts(contacts.filter((contact)=>{return contact.id !== id}))
      }
  }); 
  }

  // We set contacts to [] to delete all contacts.
  const handleDeleteAll = () =>{
    setContacts((contacts)=>[]);
  }

  // we fetch the url to update a contact of a particular id and we get the updated name and email as arguments to update.
  const onhandleUpdate = async(id,name,email)=>{
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        name: name,
        email:email
       
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) =>{
        console.log(response);
        contacts.map((contact)=>{
            console.log(contact);
            if(contact.id === id){
              console.log(contact.name+" "+name);
              contact.name=name;
              contact.email=email;
              
              setContacts((contacts)=>[...contacts]);
            }
            return contact;
          })
        
      } )
      
      }
    

  return(
    <div className='contacts-list'>
      <div className='c'>
        <h1>Contacts List</h1>
        <br/>
        {/* we call the AddUser component and send fetchUser as props so we can call fetchuser with the name and email inputs we get from the user */}
        <AddUser onAdd={fetchUser}/>
        {/* We click on this button and this triggers handleDeleteAll to delete all the contacts */}
        <button class="button" className='delete-all' onClick={handleDeleteAll}>Delete All</button>
        
        <div className='contacts'>
          {/* We map over the contacts and for each contact we call a component and send details of that contact as props so we can use those details in that component */}
          {contacts.length > 0 ?contacts.map((contact)=>(<User id={contact.id} key={`user-${contact.id}`} name={contact.name} email={contact.email} onDelete={onhandleDelete} onUpdate= {onhandleUpdate}/>)):'No Contacts to Display'}
        </div>
      </div>

    </div>
  )

}

export default App;
