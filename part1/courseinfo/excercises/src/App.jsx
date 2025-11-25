const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  

  return (
    <div>
      <div className="Header">
        <h1>{course}</h1>
      </div>
      <Content
        part1={parts[0]}
        part2={parts[1]}
        part3={parts[2]}
      ></Content>
      <div className="Total">
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>
    </div>
  

  )
}

const Part = (props) => {
  return(
    <p>
      {props.name} {props.excercises}
    </p>
  ) 
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1.name} exercises={props.part1.exercises} />
      <Part name={props.part2.name} exercises={props.part2.exercises} />  
      <Part name={props.part3.name} exercises={props.part3.exercises} />
    </div>
  )
}

export default App