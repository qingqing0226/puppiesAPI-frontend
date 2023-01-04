import React, {useState} from 'react'
import { Puppy } from '../types/types';

interface IPuppyComponentProps {
  puppy: Puppy
}

const Card = ({puppy} : IPuppyComponentProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleClick = (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowDetails((prev) => !prev);
  }
  return (
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
  )
}

export default Card