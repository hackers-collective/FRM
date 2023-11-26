import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/scriptkkiddie/Dataset/main/API/FinTech/Transactions.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setTxns(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const txnList = txns.map(txn => (
    <h1
      key={txn.id}
      style={{
        color: txn.isOTP ? 'red' : 'darkgreen',
        fontStyle: txn.isOTP ? 'italic' : '',
      }}
    >
      {txn.mode}
    </h1>
  ));

  return <>{txnList}</>;
}
