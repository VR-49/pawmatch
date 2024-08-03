import React, {useState} from "react";
//pass down props from fetched data in container
const AddAnimalForm = () => {
  const [animalImgInput, setAnimalImg] = useState('');
  const [animalSpeciesInput, setAnimalSpecies] = useState('');
  const [animalGenderInput, setAnimalGender] = useState('');
  const [animalWeightInput, setAnimalWeight] = useState('');
  const [animalAgeInput, setAnimalAge] = useState('');
  const [animalAboutInput, setAnimalAbout] = useState('');

  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/shelter-animals", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          animalImg: animalImgInput,
          species: animalSpeciesInput,
          gender: animalGenderInput,
          weight: animalWeightInput,
          age: animalAgeInput,
          about: animalAboutInput
        })
      })
      if (response.ok) {
        const data = await response.json();
        console.log('Successful POST', data);
      } else {
        console.log('Error', response.statusText);
      }
      setAnimalImg('');
      setAnimalSpecies('');
      setAnimalGender('');
      setAnimalWeight('');
      setAnimalAge('');
      setAnimalAbout('');
    } catch (error) {
        console.error('Error:', error)
    }
  }
  return (
    <form onSubmit={handleSumbit}>
      <label> Image:
        <input type="text" value={animalImgInput} onChange={(event) => setAnimalImg(event.target.value)} />
      </label>
      <label> Species:
        <input type="text" value={animalSpeciesInput} onChange={(event) => setAnimalSpecies(event.target.value)} />
      </label>
      <label> Gender:
        <input type="text" value={animalGenderInput} onChange={(event) => setAnimalGender(event.target.value)} />
      </label>
      <label> Weight:
        <input type="text" value={animalWeightInput} onChange={(event) => setAnimalWeight(event.target.value)} />
      </label>
      <label> Age:
        <input type="text" value={animalAgeInput} onChange={(event) => setAnimalAge(event.target.value)} />
      </label>
      <label> About:
        <input type="text" value={animalAboutInput} onChange={(event) => setAnimalAbout(event.target.value)} />
      </label>
      <button type="submit">Add Animal</button>
    </form>
  ) 
}

export default AddAnimalForm;