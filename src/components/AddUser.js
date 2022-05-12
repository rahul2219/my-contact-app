import { useState } from 'react';
import './AddUser.css';

export const  AddUser = ({onAdd})=>{
    const [name,setName] = useState('');
    const[email,setEmail] = useState('');

    const handleClick = (e)=>{
        // We want to prevent the page from loading so we use preventDefault method.
        e.preventDefault();
        // we call onAdd which we get as props so we can actually add user to contacts giving the name and email we got from input.
        onAdd(name,email);
        
    }
    const handleChangeName=(e)=>{
        e.preventDefault();
        // As the user is typing we store the value the user has typed in name.
        setName(e.target.value);
    }
    const handleChangeEmail=(e)=>{
        e.preventDefault();
        // As the user is typing we store the value the user has typed in email.
        setEmail(e.target.value);
    }

    return(
        <div className='input'>
            <form>
            <div className='input-class'>
                <label> Name:</label>
                <input type="text" placeholder='Name' onChange={handleChangeName}></input>
                <label>Email:</label>
                <input type="text" placeholder='Email' onChange={handleChangeEmail}></input>
            </div>
            <div className='submit'>
                <input type="submit" value="Add Contact" onClick={handleClick} />
            </div>
            </form>
        </div>
    )
}

