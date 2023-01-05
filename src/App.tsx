import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Container from './components/Container';
import { CreatePuppy, Puppy } from './types/types';

const API_LINK = 'http://localhost:8080/api/puppies';

function App() {
  const [puppies, setPuppies] = useState<Array<Puppy>>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const breedRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    const getData = async() => {
      const results = await fetch(API_LINK, {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const data = await results.json();
      setPuppies(data);
    }

    getData();

  }, []);

  const handleAddbtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowAddForm((prev) => !prev);
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const breed = breedRef.current ? breedRef.current.value : '';
    const name = nameRef.current ? nameRef.current.value : '';
    const birthDate = birthRef.current ? birthRef.current.value : '';
    let image = imageRef.current ? imageRef.current.value : '';
    if(image === '') {
      const results = await fetch(`https://api.unsplash.com/search/photos/?page=1&query=${breed}`, 
      { headers: { 'Authorization': 'Client-ID ko8OWQ2OyIrJO0uNQbyuF2F6LD1xBUkiMZpiwuX5Mdg' } });
      const data = await results.json();
      image = data.results[0].urls.small;
    }
    const body: CreatePuppy = {
      breed: breed,
      name: name,
      birthDate: birthDate,
      image: image
    }
    await fetch(API_LINK, {
      method: 'POST', 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })

    if(breedRef.current) breedRef.current.value = '';
    if(nameRef.current) nameRef.current.value = '';
    if(birthRef.current) birthRef.current.value = '';
    if(imageRef.current) imageRef.current.value = '';

    window.location.reload();
  }

  return (
    <div className="App">
      <header className='header'>
        <h1>PuppyLand</h1>
        <div className='btn-container'>
          <button className='btn' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAddbtn(e)}>Add A Puppy</button>
        </div>
        {showAddForm && (        
          <form className='addForm' onSubmit={handleSubmit}>
            <input type='text' placeholder={'breed'} ref={breedRef} required />
            <input type='text' placeholder={'name'} ref={nameRef} required />
            <input type='text' placeholder={'birthdate (yyyy-mm-dd)'} ref={birthRef} required />
            <input type='text' placeholder={'image url (if empty, a random image will be added)'} ref={imageRef} />
            <button type='submit'>Submit</button>
          </form>)}
      </header>
      <Container puppies={puppies} />
    </div>
  );
}

export default App;
