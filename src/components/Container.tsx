import React from 'react';
import { Puppy } from '../types/types';
import Card from './Card';

interface IPuppyListComponentProps {
    puppies: Puppy[]
}

const Container = ({puppies}: IPuppyListComponentProps) => {
  return (
    <div className='container'>
        {puppies.map((p, index) => <Card puppy={p} />)}
    </div>
  )
}

export default Container