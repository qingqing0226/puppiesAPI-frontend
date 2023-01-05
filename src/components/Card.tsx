import React, {useState} from 'react'
import { Puppy } from '../types/types';

const API_LINK = 'http://localhost:8080/api/puppies';
interface IPuppyComponentProps {
  puppy: Puppy
}

const Card = ({puppy} : IPuppyComponentProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleClick = (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowDetails((prev) => !prev);
  }

  const handleDelete = async() => {
    await fetch(`${API_LINK}/${puppy.id}`, {method:'DELETE', mode: 'cors', headers: {'Content-Type': 'application/json'}});
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
        <button className='delete' onClick={() => { handleDelete()}}>Delete</button>
        <button className='edit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault(); handleDelete()}}>Edit</button>
      </div>
    </div>
  )
}

export default Card