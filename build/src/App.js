import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [error, setError] = useState(null);

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
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  if (error) {
    return <div>Error: {error}</div>;
  }

  const txnList = txns.map((txn, index) => (

  <tr>
    <td
      
     /* 
        style={{
          color: txn.isOTP ? 'red' : 'darkgreen',
          fontStyle: txn.isOTP ? 'italic' : '',
        }}
      */
    >
      {txn.txnMode} {/* Use "txn.txnMode" instead of "txn.mode" */}
    </td>
    <td
      key={index} // Using index as a key since the data doesn't have a unique ID property
    >
      {txn.refUserNo}
    </td>
    <td>
      {txn.isOTP}
    </td>
    <td>
      {txn.status}
    </td>
  </tr>
  ));
  
  return (
    <table>
      <tr>
        <th>Mode</th>
        <th>TXN ID</th>
        <th>OTP Triggered?</th>
        <th>TXN Status</th>
      </tr>
      {txnList}
    </table>
  );


}
