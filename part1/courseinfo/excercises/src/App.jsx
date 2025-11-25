const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  

  return (
    <div>
      <div className="Header">
        <h1>{course}</h1>
      </div>
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      ></Content>
      <div className="Total">
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
      </div>
    </div>
  

  )
}

const Part = (props) => {
  return(
    <p>
      {props.name} {props.excercise}
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