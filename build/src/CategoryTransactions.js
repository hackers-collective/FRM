import React from 'react';

function CategoryTransactions({ transactions, category}) {

  const filteredTransactions = transactions.filter(
    (txn) => txn.txnMode.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <h2>{category} Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>TXN ID</th>
            <th>OTP Triggered?</th>
            <th>TXN Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.refUserNo}</td>
              <td>{txn.isOTP ? 'true' : 'false'}</td>
              <td>{txn.status}</td>
              <td>{txn.isFraudulent ? 'Fraudulent' : 'Not Fraudulent'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTransactions;
