import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    fetch('http://localhost:3001/persons')
    .then(response => response.json())
    .then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExist = persons.some(
      person => person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )

    if(nameExist) {
      alert(`${newName} is already added to phonebook`)
      return  
    }
    
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log("Person added")
        setPersons(persons.concat(response.data))
        setNewName('') 
        setNewNumber('')
      })
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

      <Persons persons={personToShow}/>
      
    </div>
  )
}

export default App