import React, { useState, useEffect } from 'react';

function TransactionTable() {
  const [txns, setTxns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

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
  
}

export default TransactionTable;
