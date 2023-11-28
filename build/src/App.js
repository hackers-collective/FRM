import React, { useState } from 'react';
import Header from './Header';
import TransactionTable from './TransactionTable';
import FraudForm from './FraudForm';

export default function App() {
  const [txns, setTxns] = useState([]);

  const handleReport = (fraudData) => {
    // Update state with the new fraud data
    setTxns([...txns, fraudData]);
  };

  return (
    <div>
      <Header />
      <FraudForm onReport={handleReport} />
      <TransactionTable transactions={txns} />
    </div>
  );
}
