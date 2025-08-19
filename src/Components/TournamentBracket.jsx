import React from 'react';
import BracketTable from './Bracket';
import BracketTableReverse from './BracketTableReverse';

const TournamentBracket = ({ groupA, groupB, winner }) => {
  return (
    <div style={{
      background: 'black',
      color: '#333',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      minHeight: '100vh',
      overflowX: 'auto',
    }}>
      <h1 style={{
        color: '#007bff',
      
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '32px',
        letterSpacing: '2px',
        fontWeight: 700,
      }}>
        TOURNAMENT CUP
      </h1>

      <div style={{
        width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        //  gap: '60px' 
        backgroundImage: "url('/src/assets/touramant.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",

      }}>

        {/* Group A */}
        <div style={{ textAlign: 'left', flex: 1, minWidth: '350px' }}>
          <h3 style={{
            marginBottom: '20px',
            color: '#007bff',
            borderBottom: '2px solid #007bff',
            paddingBottom: '4px'
          }}>
            Group A
          </h3>
          <BracketTable rounds={groupA} />
        </div>

        {/* Winner Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '60px',
          minWidth: '160px',
        }}>
          <p
            style={{
              width: '100px',
              height: '100px',
              fontSize: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 0,
            }}
          >
            🏆
          </p>

          <h2 style={{
            color: '#ff9900',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '10px'
          }}>
            WINNER
          </h2>
          <div style={{
            background: '#007bff',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap'
          }}>
            {winner}
          </div>
        </div>

        {/* Group B */}
        <div style={{ textAlign: 'right', flex: 1, minWidth: '350px' }}>
          <h3 style={{
            marginBottom: '20px',
            color: '#007bff',
            borderBottom: '2px solid #007bff',
            paddingBottom: '4px'
          }}>
            Group B
          </h3>
          <BracketTableReverse rounds={groupB} />
        </div>
      </div>
    </div>
  );
};

export default TournamentBracket;
