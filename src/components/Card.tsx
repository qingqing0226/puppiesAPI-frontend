import React, {useState, useRef} from 'react'
import { Puppy, CreatePuppy } from '../types/types';
import '../App.css';

const API_LINK = 'http://localhost:8080/api/puppies';
interface IPuppyComponentProps {
  puppy: Puppy
}

const Card = ({puppy} : IPuppyComponentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const breedRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleClick = (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowDetails((prev) => !prev);
  }

  const handleDelete = async() => {
    await fetch(`${API_LINK}/${puppy.id}`, {method:'DELETE', mode: 'cors', headers: {'Content-Type': 'application/json'}});
    window.location.reload();
  }

  const handleEdit = () => {
    setShowEditForm((prev) => !prev);
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const breed = breedRef.current ? breedRef.current.value : '';
    const name = nameRef.current ? nameRef.current.value : '';
    const birthDate = birthRef.current ? birthRef.current.value : '';
    const image = imageRef.current ? imageRef.current.value : '';

    const body: CreatePuppy = {
      breed: breed,
      name: name,
      birthDate: birthDate,
      image: image
    }
    await fetch(`${API_LINK}/${puppy.id}`, {
      method: 'PUT', 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
  
    window.location.reload();
  }

  return (
    <div className='cardContainer'>
      <div className='card' onClick={(e : React.MouseEvent<HTMLDivElement>) => handleClick(e)}>
        <img src={puppy.image} alt={puppy.name} />
        <h2>{puppy.name}</h2>
        {showDetails &&   
          <div className='details'>
            <p>ID: {puppy.id}</p>
            <p>Breed: {puppy.breed}</p>
            <p>Birth Date: {puppy.birthDate}</p>
          </div>
        }
      </div>
      <div className='btnContainer'>
        <button className='btn delete' onClick={() => { handleDelete();}}>Delete</button>
        <button className='btn edit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.stopPropagation(); e.preventDefault(); handleEdit()}}>Edit</button>
      </div>
      {showEditForm && (        
          <form className='editForm' onSubmit={handleSubmit}>
            <input type='text' placeholder={'breed'} ref={breedRef} defaultValue={puppy.breed} required />
            <input type='text' placeholder={'name'} ref={nameRef} defaultValue={puppy.name} required />
            <input type='text' placeholder={'birthdate (yyyy-mm-dd)'} ref={birthRef} defaultValue={puppy.birthDate} required />
            <input type='text' placeholder={'image url (if empty, a random image will be added)'} ref={imageRef} defaultValue={puppy.image} />
            <button type='submit' className='btn'>Submit</button>
          </form>)}
    </div>
  )
}

export default Card