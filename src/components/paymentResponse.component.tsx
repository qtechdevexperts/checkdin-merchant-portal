import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import { Container, Col, Row, Button } from "@themesberg/react-bootstrap";

import BgImage from "../assets/signin.svg";
import { RoutePath } from "../router/routes";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../constants";

const PaymentResponse: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [stripePromise, setStripePromise] = useState<any>(null);

  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret =
      new URLSearchParams(window.location.search).get(
        "setup_intent_client_secret"
      ) || "";

    console.log(clientSecret);

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }): any => {
      // Inspect the SetupIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      console.log(setupIntent);

      switch (setupIntent?.status) {
        case "succeeded":
          setMessage("Success! Your payment method has been saved.");
          break;

        case "processing":
          setMessage(
            "Processing payment details. We'll update you when processing is complete."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage(
            "Failed to process payment details. Please try another payment method."
          );
          break;
        default:
          setMessage("Something unexpected happened");
          break;
      }
    });
  }, [stripe]);

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage}` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign-up Complete!</h3>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    {message && (
                      <div className="d-flex justify-content-center text-center">
                        <div
                          className="alert alert-info w-100 mt-2"
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    )}
                    <Button
                      as={Link}
                      to={RoutePath.RegisterConfirmation.path}
                      variant="primary"
                      className="w-100"
                    >
                      {` Confirm your account `}
                    </Button>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default PaymentResponse;
