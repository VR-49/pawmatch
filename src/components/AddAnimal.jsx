import React, {useState} from "react";
//pass down props from fetched data in container
const AddAnimalForm = (props) => {
  //props shelterId need to be referenced to add animal to the shelter's pet_Ids array
  const [animalImgInput, setAnimalImg] = useState('');
  const [animalBreedInput, setAnimalBreed] = useState('');
  const [animalSpeciesInput, setAnimalSpecies] = useState('');

  const [animalGenderInput, setAnimalGender] = useState('');
  const [animalWeightInput, setAnimalWeight] = useState('');
  const [animalAgeInput, setAnimalAge] = useState('');
  const [animalAboutInput, setAnimalAbout] = useState('');
  const [animalNameInput, setAnimalName] = useState('');
  const [animalPersonalityInput, setAnimalPersonality] = useState('');

	//image/file handler
	function handleImage(e) {
		setAnimalImg(e.target.files[0])
	}

  const handleSumbit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('shelterId', props.shelterId)
    formData.append('picture', animalImgInput)
    formData.append('species', animalSpeciesInput)
    formData.append('breed', animalBreedInput)
    formData.append('gender', animalGenderInput)
    formData.append('weight', animalWeightInput)
    formData.append('age', animalAgeInput)
    formData.append('about', animalAboutInput)
    formData.append('name', animalNameInput)
    formData.append('personality', animalPersonalityInput)


    try {
      const response = await fetch("/api/shelter/addpet", {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json();
        console.log('Successful POST', data);
      } else {
        console.log('Error', response.statusText);
      }
      setAnimalImg('');
      setAnimalBreed('');
      setAnimalGender('');
      setAnimalWeight('');
      setAnimalAge('');
      setAnimalAbout('');
      setAnimalName('');
      setAnimalPersonality('');
      setAnimalSpecies('');
    } catch (error) {
        console.error('Error:', error)
    }
  }
  return (
    <form onSubmit={handleSumbit}>
      <label> Image:
        <input type="text" value={animalImgInput} onChange={handleImage} />
      </label>
      <label> Name:
        <input type="text" value={animalNameInput} onChange={(event) => setAnimalName(event.target.value)} />
      </label>
      <label> Species:
        <input type="text" value={animalSpeciesInput} onChange={(event) => setAnimalSpecies(event.target.value)} />
      </label>
      <label> Breed:
        <input type="text" value={animalBreedInput} onChange={(event) => setAnimalBreed(event.target.value)} />
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
      <label> Personality:
        <input type="text" value={animalPersonalityInput} onChange={(event) => setAnimalPersonality(event.target.value)} />
      </label>
      <label> About:
        <input type="text" value={animalAboutInput} onChange={(event) => setAnimalAbout(event.target.value)} />
      </label>
      <button type="submit">Add Animal</button>
    </form>
  ) 
}

export default AddAnimalForm;