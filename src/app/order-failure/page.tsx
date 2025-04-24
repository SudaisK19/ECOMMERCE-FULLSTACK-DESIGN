import React from 'react';
import { useRouter } from 'next/navigation';

// Functional component for the Order Failure page
const OrderFailure = () => {
  const router = useRouter();

  // Function to handle the redirect back to the cart page
  const handleBackToCart = () => {
    router.push("/cart"); // Redirect back to the cart page
  };

  return (
    <div style={styles.container}>
      <div style={styles.failureBox}>
        <h1 style={styles.failureText}>Payment Failed</h1>
        <p style={styles.failureDescription}>
          Unfortunately, there was an issue processing your payment. Please try again later.
        </p>
        <button onClick={handleBackToCart} style={styles.backToCartBtn}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

// Styles for the failure page
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
    padding: '2em',
  },
  failureBox: {
    background: '#fff',
    borderRadius: '10px',
    padding: '2em',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px', // Ensuring the box doesn't stretch too wide
  },
  failureText: {
    color: 'red',
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '1em',
  },
  failureDescription: {
    margin: '1em 0',
    color: '#333',
    fontSize: '1.1em',
  },
  backToCartBtn: {
    padding: '1em 2em',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s',
    marginTop: '1.5em', // Spacing from the description
  },
  // Hover effect for the "Back to Cart" button
  backToCartBtnHover: {
    backgroundColor: '#b71c1c',
  },
};

export default OrderFailure;
