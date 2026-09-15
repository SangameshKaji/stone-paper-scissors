import { useState } from 'react'
import ScoreBoard from '../components/game/ScoreBoard'
import ChoiceButton from '../components/game/ChoiceButton'
import MatchSelector from '../components/game/MatchSelector'
import ModeSelector from '../components/game/ModeSelector'

function Game() {
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [round, setRound] = useState(1)
  const [result, setResult] = useState('')
  const [matchType, setMatchType] = useState('best3')
  const [customRounds, setCustomRounds] = useState(6)
  const [matchOver, setMatchOver] = useState(false)
  const [mode, setMode] = useState('NORMAL')

  const targetScore =
    matchType === 'best3'
      ? 2
      : matchType === 'best5'
        ? 3
        : Math.ceil(customRounds / 2)

  async function handleChoice(choice) {
    if (matchOver) {
      return
    }

    const response = await fetch('http://localhost:8080/api/game/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        choice,
        mode
      })
    })

    const data = await response.json()

    let newPlayerScore = playerScore
    let newComputerScore = computerScore

    if (data.winner === 'Player') {
      newPlayerScore += 1
      setPlayerScore(newPlayerScore)
    }

    if (data.winner === 'Computer') {
      newComputerScore += 1
      setComputerScore(newComputerScore)
    }

    const currentRound = round

    if (matchType === 'custom') {
      if (currentRound >= customRounds) {
        setMatchOver(true)
      } else {
        setRound(currentRound + 1)
      }
    } else if (
      newPlayerScore >= targetScore ||
      newComputerScore >= targetScore
    ) {
      setMatchOver(true)
    } else {
      setRound(currentRound + 1)
    }

    setResult(
      `${data.playerChoice} · ${data.computerChoice} · ${data.winner}`
    )
  }

  function playAgain() {
    setPlayerScore(0)
    setComputerScore(0)
    setRound(1)
    setResult('')
    setMatchOver(false)
  }

  function handleMatchTypeChange(type) {
    setMatchType(type)
    setPlayerScore(0)
    setComputerScore(0)
    setRound(1)
    setResult('')
    setMatchOver(false)
  }

  function handleModeChange(newMode) {
    setMode(newMode)
    setPlayerScore(0)
    setComputerScore(0)
    setRound(1)
    setResult('')
    setMatchOver(false)
  }

  const matchWinner =
    playerScore > computerScore
      ? 'You Win'
      : playerScore < computerScore
        ? 'Computer Wins'
        : 'Draw'

  const scoreMargin = Math.abs(playerScore - computerScore)

  return (
    <main className="game">
      <MatchSelector
        matchType={matchType}
        onChange={handleMatchTypeChange}
        customRounds={customRounds}
        onCustomRoundsChange={setCustomRounds}
      />

      <ModeSelector
        mode={mode}
        onChange={handleModeChange}
      />

      <ScoreBoard
        playerName="User1"
        playerScore={playerScore}
        computerScore={computerScore}
        round={round}
      />

      {matchOver ? (
        <section className="match-result">
          <p className="match-result-label">MATCH COMPLETE</p>

          <h1>{matchWinner}</h1>

          <p className="final-score">
            User1 <strong>{playerScore}</strong>
            <span>—</span>
            <strong>{computerScore}</strong> Computer
          </p>

          <p className="margin-text">
            {matchWinner === 'Draw'
              ? 'The match ended in a draw'
              : matchWinner === 'You Win'
                ? `You won by ${scoreMargin} round${scoreMargin !== 1 ? 's' : ''}`
                : `Computer won by ${scoreMargin} round${scoreMargin !== 1 ? 's' : ''}`}
          </p>

          <button className="play-again-button" onClick={playAgain}>
            Play Again
          </button>
        </section>
      ) : (
        <section className="choice-area">
          <p className="choice-heading">
            {result || 'Make your choice'}
          </p>

          <div className="choices">
            <ChoiceButton
              emoji="🪨"
              label="Rock"
              onClick={() => handleChoice('Rock')}
            />

            <ChoiceButton
              emoji="📄"
              label="Paper"
              onClick={() => handleChoice('Paper')}
            />

            <ChoiceButton
              emoji="✂️"
              label="Scissors"
              onClick={() => handleChoice('Scissors')}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default Game