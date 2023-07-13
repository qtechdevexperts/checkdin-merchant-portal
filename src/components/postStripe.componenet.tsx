import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Row, Col } from "@themesberg/react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import PaymentResponse from "./paymentResponse.component";
import { STRIPE_PUBLIC_KEY, STRIPE_SETUP_URL } from "../constants";

import BgImage from "../assets/signin.svg";

const PostStripe: React.FC = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      setStripePromise(loadStripe(STRIPE_PUBLIC_KEY));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <PaymentResponse />
        </Elements>
      )}
    </>
  );
};

export default PostStripe;
