function ModeSelector({ mode, onChange }) {
  return (
    <div className="mode-selector">
      <button
        className={mode === 'NORMAL' ? 'active' : ''}
        onClick={() => onChange('NORMAL')}
      >
        N
      </button>

      <button
        className={mode === 'PLAYER_FAVORED' ? 'active' : ''}
        onClick={() => onChange('PLAYER_FAVORED')}
      >
        U
      </button>

      <button
        className={mode === 'COMPUTER_FAVORED' ? 'active' : ''}
        onClick={() => onChange('COMPUTER_FAVORED')}
      >
        C
      </button>
    </div>
  )
}

export default ModeSelector