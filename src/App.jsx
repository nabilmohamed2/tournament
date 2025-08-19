import React, { useState } from 'react';
import PlayerShortlist from './Components/PlayerShortlist';
import FinalRound from './Components/FinalRound.jsx';
import TournamentBracket from './Components/TournamentBracket.jsx'

const App = () => {
  const [initialCount, setInitialCount] = useState('8');
  const [rounds, setRounds] = useState([]);
  const [roundsData, setRoundsData] = useState([])
  const [roundsData2, setRoundsData2] = useState([])
  const [finalWinner, setFinalWinner] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const n = parseInt(initialCount);
    if (!isNaN(n) && n > 0) {
      const generatedRounds = [];
      let count = n;
      while (count >= 1) {
        generatedRounds.push(count);
        count = Math.floor(count / 2);
      }
      setRounds(generatedRounds);
    }
  };

  return (
    <div className="text-white "
      style={{ width: '100vw', height: '100vh' }}
    >
      <p>"</p>
      {/* Form Section */}
      <div className="card shadow mb-5" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Start Tournament</h2>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="number"
              className="form-control"
              value={initialCount}
              onChange={(e) => setInitialCount(e.target.value)}
              placeholder="Enter number of players (e.g. 8)"
            />
            <button type="submit" className="btn btn-primary">
              Start
            </button>
          </form>
        </div>
      </div>

      {/* Rounds Section */}
      <div className="d-flex flex-column align-items-center gap-4">
        {rounds.map((count, index) => (
          <div key={index} className="w-100" style={{ maxWidth: '700px' }}>
            <PlayerShortlist
              playerCount={count}
              round_no={index + 1}
              roundsData={roundsData}
              setRoundsData={setRoundsData}
              group={"A"}
            />
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-center gap-4">
        {rounds.map((count, index) => (
          <div key={index} className="w-100" style={{ maxWidth: '700px' }}>
            <PlayerShortlist
              playerCount={count}
              round_no={index + 1}
              roundsData={roundsData2}
              setRoundsData={setRoundsData2}
              group={"B"}
            />
          </div>
        ))}
      </div>

      {/* Final Round */}
      {rounds.length > 0 &&
        roundsData.length === rounds.length &&
        roundsData2.length === rounds.length &&
        roundsData.every(round => round.length > 0) &&
        roundsData2.every(round => round.length > 0) && (
          <FinalRound
            groupAWinner={roundsData[roundsData.length - 1][0]}
            groupBWinner={roundsData2[roundsData2.length - 1][0]}
            setFinalWinner={setFinalWinner}
          />
        )}

      {/* Tournament Bracket Section */}
      {rounds.length > 0 &&
        roundsData.length === rounds.length &&
        roundsData2.length === rounds.length &&
        roundsData.every(round => round.length > 0) &&
        roundsData2.every(round => round.length > 0) && (
          <TournamentBracket
            groupA={roundsData}
            groupB={roundsData2}
            winner={finalWinner}
          />
        )}

    </div>
  );
};

export default App;

