import { useState } from 'react'
import Home from './pages/Home'
import Game from './pages/Game'

function App() {
  const [page, setPage] = useState('home')

  if (page === 'game') {
    return <Game />
  }

  return <Home onStart={() => setPage('game')} />
}

export default App