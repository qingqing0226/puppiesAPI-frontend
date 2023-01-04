import React from 'react'
import { Puppy } from '../types/types';

interface IPuppyComponentProps {
  puppy: Puppy
}

const Card = ({puppy} : IPuppyComponentProps) => {
  return (
    <div className='card'>
      <img src={puppy.image} alt={puppy.name} />
      <h2>{puppy.name}</h2>
    </div>
  )
}

export default Card