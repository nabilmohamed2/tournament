import React, { useState } from 'react'

const TournamentCup = () => {
  const [playerCount, setPlayerCount] = useState('')
  const [rounds, setRounds] = useState([])

  const generateRounds = (n) => {
    const rounds = []
    let currentRound = []
    for (let i = 1; i <= n; i++) {
      currentRound.push(`Player ${i}`)
    }
    rounds.push(currentRound)

    let roundNum = 1
    while (currentRound.length > 1) {
      const nextRound = []
      for (let i = 0; i < currentRound.length; i += 2) {
        nextRound.push(`Winner ${i / 2 + 1}`)
      }
      rounds.push(nextRound)
      currentRound = nextRound
      roundNum++
    }

    return rounds
  }

  const handleStart = () => {
    const n = parseInt(playerCount)
    if (!isNaN(n) && n > 1 && (n & (n - 1)) === 0) {
      // only allow powers of 2 (e.g. 4, 8, 16)
      const generated = generateRounds(n)
      setRounds(generated)
    } else {
      alert('Enter a valid power of 2 (e.g. 4, 8, 16)')
    }
  }

  const renderRounds = (rounds) => (
    <div style={styles.roundsWrapper}>
      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} style={styles.roundColumn}>
          <h5 style={styles.roundTitle}>Round {roundIndex + 1}</h5>
          {round.map((team, i) => {
            // Calculate vertical spacing
            let marginTop = 0
            if (roundIndex === 1) marginTop = i === 0 ? 40 : 80
            else if (roundIndex === 2) marginTop = i === 0 ? 80 : 160
            else if (roundIndex === 3) marginTop = i === 0 ? 160 : 320

            return (
              <div key={i} style={{ marginTop }}>
                <div style={styles.matchPair}>
                  <div style={styles.team}>{team}</div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>TOURNAMENT CUP</h2>

      {/* Input */}
      <div className="mb-4 text-center">
        <input
          type="number"
          placeholder="Enter number of players (4, 8, 16...)"
          value={playerCount}
          onChange={(e) => setPlayerCount(e.target.value)}
          className="form-control w-50 mx-auto mb-2"
        />
        <button onClick={handleStart} className="btn btn-primary">
          Generate Bracket
        </button>
      </div>

      {/* Bracket */}
      {rounds.length > 0 && (
        <div style={styles.bracketContainer}>
          <div style={styles.group}>
            <h3 style={styles.groupTitle}>Group A</h3>
            {renderRounds(rounds)}
          </div>

          <div style={styles.finalSection}>
            <h3 style={styles.finalTitle}>FINAL</h3>
            <div style={styles.winnerContainer}>
              <span style={styles.winnerText}>🏆 WINNER</span>
              <div style={styles.trophy}>🏆</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    fontFamily: "'Arial Black', Gadget, sans-serif",
    backgroundColor: '#08387d',
    color: 'white',
    padding: '20px',
    borderRadius: 15,
    width: '95vw',
    margin: 'auto'
  },
  title: {
    color: '#1fb4ff',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  bracketContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px'
  },
  group: {
    width: '60%',
    overflowX: 'auto'
  },
  groupTitle: {
    textAlign: 'left',
    marginBottom: 15,
    borderBottom: '1px solid white'
  },
  roundsWrapper: {
    display: 'flex',
    gap: '40px'
  },
  roundColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  roundTitle: {
    color: '#9ed6ff',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  matchPair: {
    marginBottom: 15,
    border: '1px solid #1fb4ff',
    borderRadius: 7,
    padding: 5,
    backgroundColor: '#003366',
    minWidth: '120px',
    textAlign: 'center'
  },
  team: {
    padding: '6px 10px',
    borderBottom: '1px solid #1fb4ff',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'default'
  },
  finalSection: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #1fb4ff',
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#003366'
  },
  finalTitle: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: '24px'
  },
  winnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  winnerText: {
    fontSize: 28,
    color: '#e4a71a',
    fontWeight: 'bold',
    textShadow: '0 0 10px #e4a71a'
  },
  trophy: {
    fontSize: 60,
    marginTop: 10
  }
}

export default TournamentCup
