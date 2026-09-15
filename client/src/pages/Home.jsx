import CornerChoice from '../components/home/CornerChoice'
import Creator from '../components/home/Creator'

function Home({ onStart }) {
  return (
    <main className="home">
      <CornerChoice emoji="📄" className="paper" />
      <CornerChoice emoji="✂️" className="scissors" />
      <CornerChoice emoji="🪨" className="rock" />

      <section className="home-content">
        <p className="game-label">STONE · PAPER · SCISSORS</p>

        <h1>Try Your Luck</h1>

        <p className="tagline">
          One choice. One chance.
        </p>

        <button className="begin-button" onClick={onStart}>
            Let&apos;s Begin
        </button>

        <button className="player-button">
          <span>User1</span>
          <small>Change name</small>
        </button>
      </section>

      <Creator />
    </main>
  )
}

export default Home