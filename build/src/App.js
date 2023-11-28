import React from 'react';
import Header from './Header';
import TransactionTable from './TransactionTable';
import FraudForm from './FraudForm';

export default function App() {

  const [txns, setTxns] = useState([]);

  const handleReport = (fraudData) => {
    
    setTxns([...txns, fraudData]);
  };
  return (
    <div>
      <Header />
      <FraudForm onReport={handleReport} />
      <TransactionTable />
    </div>
  );
}
