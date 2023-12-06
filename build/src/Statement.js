import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/scriptkkiddie/Dataset/main/API/FinTech/Statement.json'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setTxns(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  if (error) {
    return <div>Error: {error}</div>;
  }

  const txnList = txns.map((txn, index) => (
    <tr key={index}>
      <td>{txn.REF_TXN_NO}</td>
      <td>{txn.DAT_TXN_PROCESSING}</td>
      <td>{txn.REF_SUB_SEQ_NO}</td>
    </tr>
  ));
  
  return (
    <table>
      <tr>
        <th>REF_TXN_NO</th>
        <th>DAT_TXN_PROCESSING</th>
        <th>REF_SUB_SEQ_NO</th>
        {/* <th>COD_TXN_MNEMONIC</th>
        <th>COD_ACCT_NO</th>
        <th>COD_DRCR</th>
        <th>AMT_TXN_LCY</th>
        <th>TXT_TXN_DESC</th>
        <th>TXT_TRAN_PARTICULAR</th>
        <th>TXT_TXN_NARRATIVE_TO</th>
        <th>REF_TXN_NO_ORG</th>
        <th>COD_AUTH_ID</th>
        <th>REF_USR_NO</th>
        <th>COD_CHNL_ID</th>
        <th>AMT_REFUND</th>
        <th>COD_ACCT_NO_FROM</th>
        <th>COD_ACCT_NO_TO</th>
        <th>COD_CUST_ID_FROM</th>
        <th>COD_CUST_ID_TO</th>
        <th>COD_CUST_TYP_FROM</th>
        <th>COD_CUST_TYP_TO</th>
        <th>DAT_TXN_VALUE</th>
        <th>REF_USR_NO_ORG</th>
        <th>COD_GL_ACCT</th>
        <th>COD_PROD</th>
        <th>TXT_ADDL_DETAILS_FROM</th>
        <th>TXT_ADDL_DETAILS_TO</th>
        <th>TXT_DIFF_CHARGE_PARAM1</th>
        <th>TXT_DIFF_CHARGE_PARAM2</th>
        <th>TXT_DIFF_CHARGE_PARAM3</th>
        <th>COD_CC_BRN</th>
        <th>DAT_TXN_POSTING</th> */}
      </tr>
      {txnList}
    </table>
  );
}
