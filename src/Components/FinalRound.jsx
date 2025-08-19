import React, { useState } from "react";

const FinalRound = ({ groupAWinner, groupBWinner, setFinalWinner }) => {
  const [selectedWinner, setSelectedWinner] = useState(null);

  const handleWinnerSelect = (winner) => {
    setSelectedWinner(winner);
    setFinalWinner(winner);
  };

  return (
    <div className="card shadow" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="card-body text-center">
        <h3 className="mb-4">Final Round</h3>
        <div className="d-flex justify-content-around">
          <button
            className={`btn ${selectedWinner === groupAWinner ? "btn-success" : "btn-outline-primary"}`}
            onClick={() => handleWinnerSelect(groupAWinner)}
          >
            {groupAWinner}
          </button>
          <span className="mx-2">vs</span>
          <button
            className={`btn ${selectedWinner === groupBWinner ? "btn-success" : "btn-outline-primary"}`}
            onClick={() => handleWinnerSelect(groupBWinner)}
          >
            {groupBWinner}
          </button>
        </div>
        {selectedWinner && (
          <h4 className="mt-4">🏆 Winner: {selectedWinner}</h4>
        )}
      </div>
    </div>
  );
};

export default FinalRound;
