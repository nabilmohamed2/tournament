import React from 'react';

const Bracket = ({ rounds }) => {
  if (!rounds || rounds.length === 0) return null;

  return (
    <div className="container py-4">
      <div className="d-flex overflow-auto gap-4">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="d-flex flex-column align-items-center">
            <h6 className="text-muted mb-3">Round {roundIndex + 1}</h6>

            {round.map((player, i) => (
              <div
                key={i}
                className="badge bg-primary text-white px-4 py-2 mb-3"
              >
                {player}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bracket;
