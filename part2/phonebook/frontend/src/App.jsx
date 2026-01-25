import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    const confirmDelete = window.confirm(
      `Delete ${person.name}`
    )

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prevPersons =>
            prevPersons.filter(p => p.id !== id)
          )
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson= persons.some(
      person => person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )

    if(existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return  
    }
    
    personService
      .update()
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={personToShow} deletePerson={deletePerson}/>
      
    </div>
  )
}

export default App