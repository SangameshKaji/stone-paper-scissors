function CornerChoice({ emoji, className }) {
  return (
    <div className={`corner-choice ${className}`}>
      {emoji}
    </div>
  )
}

export default CornerChoice