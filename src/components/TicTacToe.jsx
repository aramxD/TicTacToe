import React, { Fragment, useState } from 'react'
import '../styles/TicTacToe.css'
const TicTacToe = () => {
  const [turn, setTurn] = useState('x') //Aqui establecemos los turno de los participantes, siempre inicia x
  const [cells, setCells] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState()

  const checkForWinner = (squares) => {
    let combos = { //estos son los casos en los que hay un ganador
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],

      ]
    }


    for (let combo in combos) { //Aqui vamos a verificar si se cumple un caso de exito
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          console.log(pattern[0], pattern[1], pattern[2])
          setWinner(squares[pattern[0]])
        }
      })
    }
  }

  const hadleRestart = () => {
    setWinner(null)
    setCells(Array(9).fill(''))
  }

  const handleOnClick = (num) => {  //Aqui establecemos el click en la celda
    if (winner){
      alert('termino el juego')
      return
    }
    
    if (cells[num] !== '') {
      alert('already clicked')
      return
    }
    
    let squares = [...cells]
    if (turn === 'x') {
      squares[num] = 'x'
      setTurn('o')
    } else {
      squares[num] = 'o'
      setTurn('x')
    }
    setCells(squares)
    checkForWinner(squares)

    console.log(squares)

  }


  const Cell = ({ num }) => {
    return (
      <td onClick={() => { handleOnClick(num) }}>

        {
          cells[num] === 'x' ?
            <i className='nes-icon close is-large' ></i> :
            cells[num] === 'o' ?
              <i className='nes-icon coin is-large' ></i> :
              <p>-</p>

        }
      </td>)
  }
  return (
    <Fragment>
      <div className="container nes-table-responsive">
        <div className="tablero">
          {winner &&
            <div className="winner">
              {
                winner === 'x' ?
                  <i className='nes-icon close is-small' ></i> :
                  <i className='nes-icon coin is-small' ></i> 
              }
              <p>it's the winner :D!!</p><i className="nes-icon trophy is-small"></i>
            </div>
            }
          <div className="turno">
            <p>Turn of :
            {
              turn === 'x' ?
                <i className='nes-icon close is-small' ></i> :
                <i className='nes-icon coin is-small' ></i>
            } </p>
            {winner&&
            <button className='nes-btn is-success' onClick={()=>hadleRestart()}>Play Again</button>}
      
      
          </div>

        </div>
        <table className='nes-table is-bordered is-centered'>

          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
      </div>



    </Fragment>
  )
}

export { TicTacToe }