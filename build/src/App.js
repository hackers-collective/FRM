import React, { useState } from 'react';
import Header from './Header';
import TransactionTable from './TransactionTable';
import FraudForm from './FraudForm';

export default function App() {
  const [txns, setTxns] = useState([]);

  const handleReport = (fraudData) => {
    const newFraudData = { ...fraudData, isFraudulent: false };
    setTxns([...txns, newFraudData]);
  };

  return (
    <div>
      <Header />
      <FraudForm onReport={handleReport} />
      <TransactionTable transactions={txns} />
    </div>
  );
}
