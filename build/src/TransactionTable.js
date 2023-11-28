import React, { useState, useEffect } from 'react';

function TransactionTable({ transactions }) {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    setTxns(transactions);
  }, [transactions]);

  const handleTagFraud = (index) => {
    const updatedTxns = [...txns];
    updatedTxns[index].isFraudulent = !updatedTxns[index].isFraudulent;
    setTxns(updatedTxns);
  };

  const txnList = txns.map((txn, index) => (
    <tr key={index}>
      <td>{txn.txnMode}</td>
      <td>{txn.refUserNo}</td>
      <td>{txn.isOTP ? 'true' : 'false'}</td>
      <td>{txn.status}</td>
      <td>
        <button onClick={() => handleTagFraud(index)}>
          {txn.isFraudulent ? 'Untag Fraud' : 'Tag Fraud'}
        </button>
      </td>
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{txnList}</tbody>
    </table>
  );
}

export default TransactionTable;
