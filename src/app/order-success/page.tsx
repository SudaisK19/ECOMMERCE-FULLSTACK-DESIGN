"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

// Functional component for the Order Success page
const OrderSuccess = () => {
  const router = useRouter();

  // Function to handle the redirect to the homepage or shopping page
  const handleContinueShopping = () => {
    router.push("/"); // Redirect to the homepage or shopping page
  };

  return (
    <div style={styles.container}>
      <div style={styles.successBox}>
        <h1 style={styles.successText}>Payment Successful!</h1>
        <p style={styles.successDescription}>
          Your order has been placed successfully. Thank you for shopping with us!
        </p>
        <button onClick={handleContinueShopping} style={styles.continueShoppingBtn}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// Styles for the success page
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
    padding: '2em',
  },
  successBox: {
    background: '#fff',
    borderRadius: '10px',
    padding: '2em',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px', // Makes it responsive
  },
  successText: {
    color: 'green',
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '1em',
  },
  successDescription: {
    margin: '1em 0',
    color: '#333',
    fontSize: '1.1em',
  },
  continueShoppingBtn: {
    padding: '1em 2em',
    backgroundColor: '#2962FF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s',
    marginTop: '1.5em',
  },
  // Adding hover effect to the button
  continueShoppingBtnHover: {
    backgroundColor: '#1e4bb9',
  },
};

export default OrderSuccess;
