import React from 'react';

// TXNs API/Query

const txns = [
  { mode: 'UPI', isOTP: false, id: 138292 },
  { mode: 'WALLET', isOTP: true, id: 229383 },
  { mode: 'ECOM', isOTP: true, id: 200393 },
];

export default function Transactions() {
  const txnList = txns.map(txn =>
    
    <>
    <h1 key={txn.id}
      style={
        {
          color: txn.isOTP ? 'red' : 'darkgreen',
          fontStyle: txn.isOTP ? 'italic' : ''
        }
      }
    >
      {txn.mode}
    </h1>
{/*     <br /> */}
      </>
      
  );

  return (
    <>
    {txnList}
    </>
  );
}
