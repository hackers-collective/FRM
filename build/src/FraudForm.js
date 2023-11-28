import React, { useState } from 'react';

function FraudForm({ onReport }) {
  const [txnMode, setTxnMode] = useState('');
  const [refUserNo, setRefUserNo] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {

    e.preventDefault();

    const fraudData = {
      txnMode,
      refUserNo,
      isOTP,
      status,
    };

    onReport(fraudData);

    setTxnMode('');
    setRefUserNo('');
    setIsOTP(false);
    setStatus('');
  };

  return (
    <form onSubmit = {handleSubmit}>
      <label>
        Transaction Mode:
        <input type="text" value={txnMode} onChange={(e) => setTxnMode(e.target.value)} />
      </label>
      <label>
        Reference User Number:
        <input type="text" value={refUserNo} onChange={(e) => setRefUserNo(e.target.value)} />
      </label>
      <label>
        OTP Triggered:
        <input type="checkbox" checked={isOTP} onChange={(e) => setIsOTP(e.target.checked)} />
      </label>
      <label>
        Transaction Status:
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      </label>
      <button type="submit">Report Fraud</button>
    </form>
  );
}

export default FraudForm;
