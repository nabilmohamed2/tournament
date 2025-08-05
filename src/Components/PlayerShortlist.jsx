import React, { useState, useRef, useEffect } from 'react';

const PlayerShortlist = ({ playerCount, round_no, roundsData, setRoundsData }) => {
  const [names, setNames] = useState(Array(playerCount).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const round = useRef(round_no).current;

  useEffect(() => {
    const defaultNames = Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);
    setNames(defaultNames);
  }, [])

  const handleChange = (index, value) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);

  };

  const allFilled = names.every((name) => name.trim() !== '');

  const handleSubmit = () => {
    if (allFilled) {
      const updated = [...names];
    
      const merged = [...roundsData, updated];  // ✅ no nesting
    
      console.log(merged);
      setRoundsData(merged);
      setSubmitted(true);
    }
     else {
      alert('Please fill in all player names.');
    }
  };

  return (
    <>
      <div className="card shadow" style={{ height: '50%' }}>
        <div className="card-body text-center">
          {!submitted ? (
            <>
              <h4 className="mb-4">
                Round {round}: Enter names of {playerCount} players
              </h4>
              <div className="row g-3 justify-content-center">
                {names.map((name, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Player ${i + 1}`}
                      value={name}
                      onChange={(e) => handleChange(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-success mt-4"
              >
                Submit Round {round}
              </button>
            </>
          ) : (
            <>
              <h5 className="text-success mb-3">
                ✅ Round {round} Completed
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {names.map((name, i) => (
                  <span
                    key={i}
                    className="badge bg-secondary fs-6 px-3 py-2"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ↓ Down Arrow */}
      {
        (playerCount > 1) ? (<div className="text-center my-3">
        <div style={{ fontSize: '4rem', color: '#0d6efd' }}>↓</div>
      </div>) : (<p></p>)
      }
    </>
  );
};

export default PlayerShortlist;
