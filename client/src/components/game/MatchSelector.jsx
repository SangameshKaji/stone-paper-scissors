function MatchSelector({ matchType, onChange, customRounds, onCustomRoundsChange }) {
  return (
    <div className="match-selector">
      <button
        className={matchType === 'best3' ? 'active' : ''}
        onClick={() => onChange('best3')}
      >
        Best of 3
      </button>

      <button
        className={matchType === 'best5' ? 'active' : ''}
        onClick={() => onChange('best5')}
      >
        Best of 5
      </button>

      <button
        className={matchType === 'custom' ? 'active' : ''}
        onClick={() => onChange('custom')}
      >
        Custom
      </button>

      {matchType === 'custom' && (
        <select
          value={customRounds}
          onChange={(event) => onCustomRoundsChange(Number(event.target.value))}
        >
          {Array.from({ length: 45 }, (_, index) => index + 6).map((rounds) => (
            <option key={rounds} value={rounds}>
              {rounds} Rounds
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default MatchSelector