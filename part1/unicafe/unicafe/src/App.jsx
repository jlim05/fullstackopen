import { useState } from 'react'

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
      <div>
        <h1>Statistics</h1>
      </div>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {allFeedback}</p>
        <p>average {getAverage()}</p>
        <p>postive {getPositive()} %</p>
      </div>
    </div>
  )
}

export default App