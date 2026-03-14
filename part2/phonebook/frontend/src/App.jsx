import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) {
      return
    }

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
        })
        .catch(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
          setNotification(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(
      p => p.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )

    if (existingPerson) {
      if (window.confirm(`${newName} is already in phonebook. Replace the old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        const personName = existingPerson.name

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson=> {
            setPersons(prevPersons => prevPersons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        .catch(error =>{
          setNotification(`Information of ${personName} has already been removed from the server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
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
      <Notification message={notification}/>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={personToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
