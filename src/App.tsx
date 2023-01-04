import React, {useState, useEffect} from 'react';
import './App.css';
import Container from './components/Container';
import { Puppy } from './types/types';

function App() {
  const [puppies, setPuppies] = useState<Array<Puppy>>([]);

  useEffect(()=> {
    const getData = async() => {
      const results = await fetch('http://localhost:8080/api/puppies', {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const data = await results.json();
      setPuppies(data);
    }

    getData();

  }, []);

  return (
    <div className="App">
      <Container puppies={puppies} />
    </div>
  );
}

export default App;
