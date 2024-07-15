import { useState } from 'react'

const StatisticLine = ({text, value}) => {

  return <p>{text} {value}</p>

}
const Statitics = ({good, neutral, bad}) => {
  
  const total = good + neutral + bad;

  const porcentaje = (good*100)/total
  const average = good/ total
  if (total == 0) {
    return  <>
  <p>No feedback</p>
  </>
  }
  return  <>
  <StatisticLine text="Good" value={good}/>
  <StatisticLine text="Neutral" value={neutral}/>
  <StatisticLine text="Bad" value={bad}/>    
  <p>Averge {average}</p>
  <p>Porcentaje {porcentaje}%</p>
  </>

}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  console.log(good)
  return (
    <>
      <h1>Give FeedBack</h1>
      <button onClick={() => setGood(good + 1)}>
        Good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        Neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        Bad
      </button>

      <div>
        <h2>Statistics</h2>
        
        <Statitics good={good} neutral={neutral} bad={bad}/>

      </div>
    </>
  )
}

// const App = () => {
//   const [ counter, setCounter ] = useState(0)

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={() => setCounter(counter + 1)}>
//         plus
//       </button>
//       <button onClick={() => setCounter(0)}>
//         zero
//       </button>
//     </div>
//   )
// }

export default App
