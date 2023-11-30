import React, { useState, useEffect } from 'react';
import CategoryTransactions from './CategoryTransactions';

function TransactionTable({ transactions }) {
  const [txns, setTxns] = useState([]);
  const [showFraudulentOnly, setShowFraudulentOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTxns(transactions);
  }, [transactions]);

  const handleTagFraud = (index) => {
    const updatedTxns = [...txns];
    updatedTxns[index].isFraudulent = !updatedTxns[index].isFraudulent;
    setTxns(updatedTxns);
  };

  const toggleView = () => {
    setShowFraudulentOnly(!showFraudulentOnly);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderCategories = () => {
    const uniqueModes = [...new Set(txns.map((txn) => txn.txnMode))];
    return uniqueModes.map((mode) => (
      <CategoryTransactions 
        key={mode}
        transactions={showFraudulentOnly ? txns.filter((txn) => txn.isFraudulent) : txns}
        category={mode}
      />
    ));
  };

  const filteredTxns = txns.filter(
    (txn) =>
      txn.txnMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.refUserNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div>
      <h1>All Transactions</h1>
      <div>
        <label>
          Search Transactions:
          <input type="text" value={searchTerm} onChange={handleSearch} />
        </label>
      </div>
      <button onClick={toggleView}>
        {showFraudulentOnly ? 'Show All Transactions' : 'Show Fraudulent Transactions Only'}
      </button>
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
      {renderCategories()}
    </div>
  );
}

export default TransactionTable;
