import React from 'react';

const BracketTable = ({ rounds }) => {
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
  const topBottomMap = {};

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

        topBottomMap[`${upperRow}-${roundIndex}`] = 'top';
        topBottomMap[`${lowerRow}-${roundIndex}`] = 'bottom';

        // add "vs" in the middle row between this pair
        const midRow = Math.floor((upperRow + lowerRow) / 2);
        if (midRow < totalRows) {
          table[midRow][roundIndex] = "vs";
        }
      }
    }
  });

  const baseCellStyle = {
    width: '140px',
    height: '50px',
    textAlign: 'left',
    verticalAlign: 'middle',
    paddingLeft: '10px',
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

  const vsStyle = {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '25px',
    display: 'inline-block',
    padding: '4px 6px',
  };

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => {
              const needsRightBorder = rightBorderMap.has(`${rowIndex}-${colIndex}`);
              const topBottom = topBottomMap[`${rowIndex}-${colIndex}`];

              const cellStyle = {
                ...baseCellStyle,
                borderRight:
                  needsRightBorder && topBottom !== 'top' && topBottom !== 'bottom'
                    ? '2px solid #007bff'
                    : 'none',
              };

              return (
                <td key={colIndex} style={cellStyle}>
                  {cell && cell !== "vs" && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 0',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          color: '#007bff',
                          fontSize: '16px',
                        }}
                      >
                        →
                      </span>
                      <span style={playerStyle}>{cell}</span>
                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '30px',
                            height: '30px',
                            // backgroundColor: 'white',
                            borderRight: '2px solid #007bff',
                            borderTop:
                              topBottom === 'top' ? '2px solid #007bff' : undefined,
                            borderBottom:
                              topBottom === 'bottom' ? '2px solid #007bff' : undefined,
                            marginTop: topBottom === 'bottom' ? '-25px' : undefined,
                            marginBottom: topBottom === 'top' ? '-25px' : undefined,
                            marginRight: '-2px',
                          }}
                        ></span>
                      </div>
                    </div>
                  )}

                  {cell === "vs" && (
                    <div style={{ textAlign: 'center', padding: '6px 0' }}>
                      <span style={vsStyle}>VS</span>
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

export default BracketTable;
