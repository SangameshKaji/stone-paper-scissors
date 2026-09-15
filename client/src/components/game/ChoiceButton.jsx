function ChoiceButton({ emoji, label, onClick }) {
  return (
    <button className="choice-button" onClick={onClick}>
      <span className="choice-emoji">{emoji}</span>
      <span className="choice-label">{label}</span>
    </button>
  )
}

export default ChoiceButton