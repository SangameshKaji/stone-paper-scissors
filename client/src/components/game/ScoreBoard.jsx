function ScoreBoard({ playerName, playerScore, computerScore, round }) {
  return (
    <section className="score-board">
      <div className="score-player">
        <span>{playerName}</span>
        <strong>{playerScore}</strong>
      </div>

      <div className="round-info">
        <span>ROUND</span>
        <strong>{round}</strong>
      </div>

      <div className="score-computer">
        <span>Computer</span>
        <strong>{computerScore}</strong>
      </div>
    </section>
  )
}

export default ScoreBoard