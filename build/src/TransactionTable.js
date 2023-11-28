import React, { useState, useEffect } from 'react';

function TransactionTable() {
  const [txns, setTxns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        console.log('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const txnList = txns.map((txn, index) => (
    <tr key={index}>
      <td>{txn.txnMode}</td>
      <td>{txn.refUserNo}</td>
      <td>{txn.isOTP ? 'true' : 'false'}</td>
      <td>{txn.status}</td>
     </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Mode</th>
          <th>TXN ID</th>
          <th>OTP Triggered?</th>
          <th>TXN Status</th>
        </tr>
      </thead>
      <tbody>{txnList}</tbody>
    </table>
  );
}

export default TransactionTable;
