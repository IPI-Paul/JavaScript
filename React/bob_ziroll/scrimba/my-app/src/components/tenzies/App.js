import React from "react"
// import Confetti from 'react-confetti'
import Die from './Die'
import './style.css'

const App = () => {
  const [tenzies, setTenzies] = React.useState(false)

  const randomDieValue =() => {
    return Math.ceil(Math.random() * 6)
  }

  const allNewDice = () => {
    // const newArray = []
    // for(let i = 0; i < 10; i++) {
    //   const newDie = {
    //     value: randomDieValue(),
    //     held: false,
    //     id: i + 1
    //   }
    //   newArray.push(newDie)
    // }
    // return newArray
    return `${{}},`
      .repeat(10)
      .split(',', 10)
      .map((_, idx) => ({
        value: randomDieValue(),
        held: false,
        id: idx + 1
      }))
  }
  const [dice, setDice] = React.useState(allNewDice())

  React.useEffect(() => {
    const firstValue = dice[0].value
    const allHeld = dice.every(die => die.held)
    const allSameNumber = dice.every(die => die.value === firstValue)
    if(allHeld && allSameNumber) {
      setTenzies(true)
    }
  }, [dice])

  const rollUnheldDice = () => {
    if(!tenzies) {
      setDice((oldDice) => oldDice.map((die, i) => 
        die.held 
          ? die
          : {value: randomDieValue(), held: false, id: i + 1}
      ))
    } else {
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  const holdDice = (id) => {
    setDice(prevDice => prevDice.map(die => 
      die.id === id
        ? {...die, held: !die.held}
        : die
    ))
  }
  
  const diceElements = dice.map((die) => (
    <Die 
      key={die.id} 
      {...die} 
      hold={() => holdDice(die.id)} 
    />
  ))

  return (
    <main className="tenzies">
      <div className="main">
        {/* {tenzies && <Confetti />} */}
        <h1>Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{diceElements}</div>
        {tenzies && <h1>Well Done!</h1>}
        <button className="roll-dice" onClick={rollUnheldDice}>
          {tenzies ? 'Reset Game' : 'Roll'}
        </button>
      </div>
    </main>
  )
 }

 export default App