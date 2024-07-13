const Header =  ({course}) => <h1>{course}</h1>
const Content =  ({parts}) => {
 const [part1, part2, ...part3] = parts
console.log(part3)
  return <>
  <p>
    {part1.name} {part1.exercises}
  </p><p>
      {part2.name} {part2.exercises}
    </p><p>
      {part3[0].name} {part3[0].exercises}
    </p>
    </>
}
const Total =  ({parts}) => {
  const [part1, part2, ...part3] = parts
return <p>Number of exercises {part1.exercises + part2.exercises + part3[0].exercises}</p>
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total  parts={course.parts}/>
    </div>
  )
}

export default App