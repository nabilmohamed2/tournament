import React, { useState, useRef, useEffect } from "react";

const PlayerShortlist = ({ playerCount, round_no, roundsData, setRoundsData, group }) => {
  const [names, setNames] = useState(Array(playerCount).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const round = useRef(round_no).current;

  useEffect(() => {
    if (round === 1) {
      // For Round 1, auto-fill placeholders
      const defaultNames = Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);
      setNames(defaultNames);
    } else {
      // For later rounds, names should be chosen from winners of previous round
      setNames(Array(playerCount).fill(""));
    }
  }, [playerCount, round]);

  const handleChange = (index, value) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const allFilled = names.every((name) => name.trim() !== "");

  const handleSubmit = () => {
    if (allFilled) {
      const updated = [...names];
      const merged = [...roundsData];
      merged[round - 1] = updated; // ✅ store round result at correct index
      setRoundsData(merged);
      setSubmitted(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Get valid options for this round
  let options = [];
  if (round > 1 && roundsData[round - 2]) {
    const prevRound = roundsData[round - 2];
    // group in pairs: [Player1, Player2], [Player3, Player4], etc.
    for (let i = 0; i < prevRound.length; i += 2) {
      options.push([prevRound[i], prevRound[i + 1]]);
    }
  }

  return (
    <>
      <div className="card shadow" style={{ height: "50%" }}>
        <div className="card-body text-center">
          <h3>Group {group}</h3>
          {!submitted ? (
            <>
              <h4 className="mb-4">
                Round {round}: {round === 1 ? `Enter names of ${playerCount} players` : "Choose winners"}
              </h4>
              <div className="row g-3 justify-content-center">
                {round === 1
                  ? // Round 1 → text inputs
                    names.map((name, i) => (
                      <div key={i} className="col-6 col-md-4 col-lg-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Player ${i + 1}`}
                          value={name}
                          onChange={(e) => handleChange(i, e.target.value)}
                        />
                      </div>
                    ))
                  : // Later Rounds → choose winner from each pair
                    options.map((pair, i) => (
                      <div key={i} className="col-6 col-md-4 col-lg-3">
                        <select
                          className="form-select"
                          value={names[i] || ""}
                          onChange={(e) => handleChange(i, e.target.value)}
                        >
                          <option value="">-- Choose Winner --</option>
                          {pair.map((player, j) => (
                            <option key={j} value={player}>
                              {player}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
              </div>
              <button onClick={handleSubmit} className="btn btn-success mt-4">
                Submit Round {round}
              </button>
            </>
          ) : (
            <>
              <h5 className="text-success mb-3">✅ Round {round} Completed</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {names.map((name, i) => (
                  <span key={i} className="badge bg-secondary fs-6 px-3 py-2">
                    {name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ↓ Down Arrow */}
      {playerCount > 1 ? (
        <div className="text-center my-3">
          <div style={{ fontSize: "4rem", color: "#0d6efd" }}>↓</div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default PlayerShortlist;
