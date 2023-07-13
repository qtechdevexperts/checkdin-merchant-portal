import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Row, Col } from "@themesberg/react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./paymentForm.component";
import PaymentSetup from "./paymentElement.component";
import { STRIPE_PUBLIC_KEY, STRIPE_SETUP_URL } from "../constants";

import BgImage from "../assets/signin.svg";

const Stripe: React.FC = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [stripeSK, setStripeSK] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    try {
      setStripePromise(loadStripe(STRIPE_PUBLIC_KEY));
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchData = async () => {
    try {
      let requestBody = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      let stripeResponse = await fetch(STRIPE_SETUP_URL, requestBody);
      let stripeResponseJSON = await stripeResponse.json();
      // console.log(stripeResponseJSON);
      // let stripeResponseJSONBody = await JSON.parse(stripeResponseJSON.body);
      // console.log(stripeResponseJSONBody);
      console.log(stripeResponseJSON.body.client_secret);
      console.log(stripeResponseJSON.body.customer_id);

      localStorage.setItem("customer_id", stripeResponseJSON.body.customer_id);
      setStripeSK(stripeResponseJSON.body.client_secret);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(stripePromise);
  console.log(stripeSK);

  return (
    <>
      <main>
        {stripePromise && stripeSK && (
          <Elements stripe={stripePromise} options={{ clientSecret: stripeSK }}>
            <PaymentSetup />
          </Elements>
        )}
      </main>
    </>
  );
};

export default Stripe;
