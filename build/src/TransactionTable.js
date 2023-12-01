import React, { useState, useEffect } from 'react';
import CategoryTransactions from './CategoryTransactions';

function TransactionTable({ transactions }) {
  const [txns, setTxns] = useState([]);
  const [showFraudulentOnly, setShowFraudulentOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('All');
  const [sortCriteria, setSortCriteria] = useState('txnId');

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

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const getFilteredAndSortedTxns = () => {
    let filteredTxns = txns;

    if (selectedMode !== 'All') {
      filteredTxns = filteredTxns.filter((txn) => txn.txnMode === selectedMode);
    }

    filteredTxns = filteredTxns.filter(
      (txn) =>
        txn.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.payerAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.payeeAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredTxns.sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
    });

    return filteredTxns;
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

  const txnList = getFilteredAndSortedTxns().map((txn, index) => (
    <tr key={index}>
      <td>{txn.txnId}</td>
      <td>{txn.txnDateTime}</td>
      <td>{txn.txnMode}</td>
      <td>{txn.payerAccount}</td>
      <td>{txn.payerIFSC}</td>
      <td>{txn.payeeAccount}</td>
      <td>{txn.payeeIFSC}</td>
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
      <div>
        <label>
          Select Transaction Mode:
          <select value={selectedMode} onChange={handleModeChange}>
            <option value="All">All</option>
            <option value="UPI">UPI</option>
            <option value="IMPS">IMPS</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Sort By:
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="txnId">TXN ID</option>
            <option value="txnDateTime">TXN Date & Time</option>
            <option value="txnMode">TXN Mode</option>
            <option value="payerAccount">Payer A/c</option>
            <option value="payerIFSC">Payer IFSC</option>
            <option value="payeeAccount">Payee A/c</option>
            <option value="payeeIFSC">Payee IFSC</option>
            <option value="isOTP">OTP Triggered?</option>
            <option value="status">TXN Status</option>
          </select>
        </label>
      </div>
      <button onClick={toggleView}>
        {showFraudulentOnly ? 'Show All Transactions' : 'Show Fraudulent Transactions Only'}
      </button>
      <table>
        <thead>
          <tr>
            <th>TXN ID</th>
            <th>TXN Date & Time</th>
            <th>TXN Mode</th>
            <th>Payer A/c</th>
            <th>Payer IFSC</th>
            <th>Payee A/c</th>
            <th>Payee IFSC</th>
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
