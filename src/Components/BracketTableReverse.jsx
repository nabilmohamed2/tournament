import React from 'react';

const BracketTableReverse = ({ rounds }) => {
  if (!rounds || rounds.length === 0) return null;

  const numRounds = rounds.length;
  const basePlayers = rounds[0].length;
  let totalRows = Math.pow(2, numRounds) - 1;

  const lastSpacing = Math.pow(2, 1);
  const lastOffset = Math.floor(lastSpacing / 2);
  const lastRowEstimate = (basePlayers - 1) * lastSpacing + lastOffset;
  if (lastRowEstimate >= totalRows) {
    totalRows += 1;
  }

  const table = Array.from({ length: totalRows }, () =>
    Array.from({ length: numRounds }, () => null)
  );

  const rightBorderMap = new Set();

  rounds.forEach((round, roundIndex) => {
    const spacing = Math.pow(2, roundIndex + 1);
    const offset = Math.floor(spacing / 2);

    round.forEach((player, i) => {
      const row = i * spacing + offset;
      if (row < totalRows) {
        table[row][roundIndex] = player;
      }
    });

    if (roundIndex < numRounds - 1) {
      for (let i = 0; i < round.length; i += 2) {
        const upperRow = i * spacing + offset;
        const lowerRow = (i + 1) * spacing + offset;
        for (let r = upperRow; r <= lowerRow; r++) {
          rightBorderMap.add(`${r}-${roundIndex}`);
        }
      }
    }
  });

  const baseCellStyle = {
    width: '140px',
    height: '50px',
    textAlign: 'right',
    verticalAlign: 'middle',
    paddingRight: '10px',
    fontSize: '14px',
    border: 'none',
  };

  const playerStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '6px 10px',
    borderRadius: '6px',
    display: 'inline-block',
    minWidth: '80px',
  };

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {[...row].reverse().map((player, colIndex) => {
              const actualColIndex = numRounds - 1 - colIndex;
              const needsRightBorder = rightBorderMap.has(`${rowIndex}-${actualColIndex}`);

              const cellStyle = {
                ...baseCellStyle,
                borderLeft: needsRightBorder ? '2px solid #007bff' : 'none',
                borderBottom: '1px solid #eee',
              };

              return (
                <td key={colIndex} style={cellStyle}>
                  {player && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 0',
                      }}
                    >
                      <span style={playerStyle}>{player}</span>
                      <span style={{
                        fontWeight: 600,
                        color: '#007bff',
                        fontSize: '16px',
                      }}>←</span>
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BracketTableReverse;
