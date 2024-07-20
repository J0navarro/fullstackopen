import { useState } from 'react';
const MostVotedIndex = ({votes , anecdotes}) => {
  let mostVotedIndex = 0;
  let mostVotes = 0;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > mostVotes) {
      mostVotes = votes[i];
      mostVotedIndex = i;      
    }
    console.log('votos ', votes[i])
  }    
   console.log('mas votado', mostVotedIndex)
  
  return <>
  <p>{anecdotes[mostVotedIndex]}</p>
    <p>has { mostVotes }</p>
    </>
};


function App() {
  const [selected, setSelected] = useState(0);
  const [shownIndexes, setShownIndexes] = useState([]);
  const [votes, setVotes] = useState(new Array(8).fill(0));

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const getUniqueRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    } while (shownIndexes[shownIndexes.length -1] == randomIndex);
    setShownIndexes([...shownIndexes, randomIndex]);
    return randomIndex;
  };

  const handleNextClick = () => {
    const newIndex = getUniqueRandomIndex();
    setSelected(newIndex);
  };

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };


  return (
    <>
    <h1>Anectdote of Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes</p>
      <button onClick={handleNextClick}>Next</button>
      <button onClick={handleVoteClick}>Vote</button>

      <h1>Anectdote Most Voted</h1>
      <MostVotedIndex votes={votes} anecdotes={anecdotes}/>
    </>
  );
}

export default App;
