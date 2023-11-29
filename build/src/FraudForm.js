import React, { useState } from 'react';

const txnModesOptions = ['UPI', 'IMPS', 'NEFT', 'WALLET'];
const statusOptions = ['Success', 'Failed', 'Pending'];

function FraudForm({ onReport }) {
  const [txnMode, setTxnMode] = useState('');
  const [refUserNo, setRefUserNo] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleReport = () => {
    if(!txnMode || !refUserNo || !status || !amount) {
      alert('Please fill in all required fields.');
      return;
    }

    const fraudData = {
      txnMode,
      refUserNo,
      isOTP,
      status,
      amount,
      description,
      isFraudulent: false,
    };

    onReport(fraudData);

    setTxnMode('');
    setRefUserNo('');
    setIsOTP(false);
    setStatus('');
    setAmount('');
    setDescription('');
  };

  return (
    <div>
      <h2>Report Fraud</h2>
      <form>
        <label>
          Transaction Mode:
          <select value={txnMode} onChange={(e) => setTxnMode(e.target.value)}>
            <option value="">Select Transaction Mode</option>
            {txnModesOptions.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          
        </label>
        <label>
          Reference User Number:
          <input 
            type="text" 
            value={refUserNo} 
            onChange={(e) => setRefUserNo(e.target.value)} 
          />
        </label>
        <label>
          OTP Triggered:
          <input 
            type="checkbox" 
            checked={isOTP} 
            onChange={(e) => setIsOTP(e.target.checked)} 
          />
        </label>
        <label>
          Transaction Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleReport}>
          Report Fraud
        </button>
      </form>
    </div>
  );
}

export default FraudForm;
