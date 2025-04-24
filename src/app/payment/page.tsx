"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

// Stripe public key
const stripePromise = loadStripe("pk_test_51RHDZcPXKwonvOJPbxHzWuSOPLirPPISyQj4XewV4BISf0HRBJ2UIBu1Zucg1S1qftYPUE41Wu068YjtyPMJwqz700XpKLkjws");

const PaymentForm = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any | null>(null);
  const [shippingAddress, setShippingAddress] = useState<string>(""); // Add state for shippingAddress
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // Fetch user profile data and store userId in localStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUserId(data.user._id); // Set userId from profile API
        localStorage.setItem("userId", data.user._id); // Store userId in localStorage
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setErrorMessage("Error fetching user profile.");
      }
    };

    fetchUser();
  }, []);

  // Check if user is logged in
  if (!userId) {
    return <div>Please log in to proceed with the payment.</div>;
  }

  // Fetch and create order data after retrieving the shipping address
  const fetchOrderData = async () => {
    if (!shippingAddress) {
      setErrorMessage("Shipping address is required.");
      return; // Don't proceed if shipping address is not available
    }

    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Send userId directly
          shippingAddress, // Send shipping address
        }),
      });

      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setOrderData(data.order); // Set order data from the response
        createPaymentIntent(data.order.totalAmount); // Create payment intent
      }
    } catch (error) {
      setErrorMessage("Error fetching order data");
      console.error(error);
    }
  };

  // Create Payment Intent based on totalAmount received from the backend
  const createPaymentIntent = async (totalAmount: number) => {
    const response = await fetch("/api/payment/checkout", {
      method: "POST",
      body: JSON.stringify({
        totalAmount,
        shippingAddress,
        userId, // Send userId to backend
        items: orderData?.items, // Send items from the created order
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.clientSecret) {
      setClientSecret(data.clientSecret); // Set client secret for Stripe payment
    } else {
      setErrorMessage("Error fetching client secret");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
        billing_details: {
          name: orderData?.customerName,
          email: orderData?.customerEmail,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed");
      setLoading(false);
      // Redirect to failure page after payment failure
      router.push("/order-failure"); // Redirect to failure page
    } else if (paymentIntent?.status === "succeeded") {
      setSucceeded(true);
      setLoading(false);
      // Redirect to success page after successful payment
      router.push("/order-success"); // Redirect to success page
    }
  };

  // Display error message if there is any
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  const styles: { [key: string]: React.CSSProperties } = {
    screen: {
      position: "relative", // Removed absolute positioning to inherit layout
      backgroundColor: "#F5F5F5", // Default background color to match other pages
      display: "flex",
      justifyContent: "center",
      padding: "3em 1.5em", // Adding padding for better spacing
      minHeight: "100vh", // Ensure full height for the page
    },
    popup: {
      width: "100%",
      maxWidth: "40em", // Ensure the form is responsive
      background: "#FFFFFF",
      padding: "2em",
      borderRadius: "0.5em",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      margin: "auto", // Centering the form
    },
    closeBtn: {
      position: "absolute",
      right: "1em",
      top: "1em",
      cursor: "pointer",
      fontSize: "20px",
    },
    cardData: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: "1.5em",
    },
    actionButton: {
      padding: "1.1em",
      width: "100%",
      height: "100%",
      fontWeight: "600",
      fontSize: "1em",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "0.5em",
      backgroundColor: "#2962FF",
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out",
    },
    disabledButton: {
      backgroundColor: "#cccccc",
    },
    inputField: {
      width: "100%",
      padding: "1em",
      margin: "0.5em 0",
      borderRadius: "0.5em",
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.screen}>
      <form style={styles.popup} onSubmit={handleSubmit}>
        <div
          style={styles.closeBtn}
          onClick={() => router.push("/cart")}
        >
          <i className="ai-cross"></i>
        </div>

        {/* Shipping Address Input */}
        <div style={{ marginBottom: "1.5em" }}>
          <label>Shipping Address</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
            style={styles.inputField}
          />
        </div>

        {/* Card Form */}
        <div style={styles.cardData}>
          <div style={{ marginBottom: "1.5em" }}>
            <strong>Card Number</strong>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "18px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          </div>

          {/* Expiry Date */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5em" }}>
            <div>
              <strong>Expiry Date</strong>
              <span>Enter the expiration date of the card</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="numbers"
                type="number"
                min="1"
                max="12"
                placeholder="MM"
                style={{ marginRight: "8px", padding: "1em", borderRadius: "0.5em", border: "1px solid #ddd" }}
              />
              <span>/</span>
              <input
                className="numbers"
                type="number"
                min="23"
                max="99"
                placeholder="YY"
                style={{ marginLeft: "8px", padding: "1em", borderRadius: "0.5em", border: "1px solid #ddd" }}
              />
            </div>
          </div>

          {/* CVC Number */}
          <div style={{ marginBottom: "1.5em" }}>
            <strong>CVC Number</strong>
            <input
              id="cvc"
              type="password"
              style={styles.inputField}
              placeholder="Enter CVC"
            />
          </div>

          {/* Cardholder Name */}
          <div style={{ marginBottom: "1.5em" }}>
            <strong>Cardholder Name</strong>
            <input
              id="name"
              type="text"
              className="uppercase"
              placeholder="CARDHOLDER NAME"
              style={styles.inputField}
            />
          </div>

          <button
            disabled={loading || succeeded}
            type="submit"
            style={{
              ...styles.actionButton,
              ...(loading || succeeded ? styles.disabledButton : {}),
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
