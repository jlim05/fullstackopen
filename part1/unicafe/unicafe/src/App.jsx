import { useState } from 'react'

const Statistics = (props) => {
  if(props.allFeedback === 0 ){
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statisticsline text="good" value={props.good} />
          <Statisticsline text="neutral" value={props.neutral} />
          <Statisticsline text="bad" value={props.bad} />
          <Statisticsline text="allFeedback" value={props.allFeedback} />
          <Statisticsline text="average" value={props.getAverage} />
          <Statisticsline text="positive" value={props.getPositive} />



        </tbody>
      </table>
    </div>
  )
}

const Statisticsline = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allFeedback + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allFeedback + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
    setAll(allFeedback + 1)
  }

  const getAverage = () =>{
    if(allFeedback === 0) return 0
    return (good - bad)/ allFeedback
  }

  const getPositive = () =>{
    if(allFeedback === 0) return 0
    return (good / allFeedback) * 100
  }

  const isEmpty = () =>{
    if(allFeedback === 0) return true 
  }

  return (
    
    <div>
      <div>
        <h1>Give feedback</h1>
      </div>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      allFeedback={allFeedback}
      getAverage={getAverage()}
      getPositive={getPositive()}/>
    </div>
  )
}

export default App