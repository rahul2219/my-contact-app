import { useState } from 'react';
import './User.css'
function User ({id,name,email,onDelete,onUpdate}){


    const[Editing,setEditing] = useState(false);
    const [newName,setnewName] = useState(name);
    const [newEmail,setnewEmail] = useState(email);
    const [deleting,setDeleting] = useState(false);

    const handleDelete = ()=>{
        setDeleting(true);
        // We call this function we we got as props and assign the id as argument to delete that particular contact.
        onDelete(id);   
    }
    const handleUpdate = ()=>{
        if(Editing === false){
            // we do set editing as true so then we can allow user to give input when he clicks on the edit button as down in the jsx we show input only when editing is true;
            setEditing(true);
        }
        else{
            // If the editing is true and the user clicks on done button we update the contact details with the newName and newEmail we got from the user.
            onUpdate(id,newName,newEmail);
            setEditing(false);
        }
    }
    const handleEditName = (e)=>{
        e.preventDefault();
        // As the user is typing we save the value user has entered in the newName.
        setnewName(e.target.value);
    }
    const handleEditEmail = (e) =>{
        e.preventDefault();
        // As the user is typing we save the value user has entered in the newEmail.
        setnewEmail(e.target.value);

    }
    return(
        <div className='list'>
            
            <span>{Editing?<input type="text" onChange = {handleEditName} value={newName}/> :name}</span>
            <span>{Editing?<input type="text" onChange = {handleEditEmail} value={newEmail}/> :email}</span>
            <span className='buttons'>
                <button onClick={handleUpdate} className='edit-contact'>{Editing? 'Done' : 'Edit'}</button>
                <button onClick={handleDelete} className='delete-contact'>{deleting? 'Deleting' : 'Delete'}</button>

            </span>
        </div>
    )
}

export default User;