import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import {
  Form as FormBS,
  InputGroup,
  Button,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faTag } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

import { auth_register } from "../services/auth.service";
import {
  STRIPE_CONFIG_URL,
  STRIPE_BASIC_PRICE_ID,
  STRIPE_MS_PRICE_ID,
} from "../constants";

const PaymentForm: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<any>("");

  const stripe = useStripe();
  const elements = useElements();

  const initialValues: {
    name: string;
    email: string;
    price_id: string;
    promo_code: string;
  } = {
    name: "",
    email: "",
    price_id: `${STRIPE_MS_PRICE_ID}`,
    promo_code: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("This is not a valid email address.")
      .required("This field is required"),
    price_id: Yup.string().required("This field is required"),
    promo_code: Yup.string(),
  });

  const handleSubmit = async (formValue: any) => {
    const { price_id, email, name, promo_code } = formValue;

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement)!;
    let clientSecret = "";

    setLoading(true);

    try {
      let requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          price_id: price_id,
          promo_code: promo_code,
        }),
      };

      let response = await fetch(STRIPE_CONFIG_URL, requestBody);

      let json = await response.json();

      if (json.body.errorMessage) {
        throw new Error(json.body.errorMessage);
      }

      let body = JSON.parse(json.body);

      clientSecret = body.latest_invoice.payment_intent.client_secret;

      console.log(window.location.origin);

      let { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
          },
        },
        return_url: `${window.location.origin}/paymentcompletion`,
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occured.");
        }
      } else {
        const email = localStorage.getItem("registerUsername") || "";
        const password = localStorage.getItem("registerPassword") || "";
        const business_name = localStorage.getItem("business_name") || "";
        const business_address = localStorage.getItem("business_address") || "";
        const business_volume = localStorage.getItem("business_volume") || "";
        const business_facebook =
          localStorage.getItem("business_facebook") || "";
        const business_twitter = localStorage.getItem("business_twitter") || "";
        const business_instagram =
          localStorage.getItem("business_instagram") || "";
        const business_website = localStorage.getItem("business_website") || "";
        const phone_number = localStorage.getItem("phone_number") || "";

        console.log(password);

        await auth_register(
          email,
          phone_number,
          business_name,
          business_address,
          business_volume,
          business_facebook,
          business_twitter,
          business_instagram
        )
          .then((response) => {
            console.log(response);

            if (response.data.errorType) {
              setMessage(response.data.errorMessage);
              setSuccessful(false);
              throw new Error(response.data.errorMessage);
            }

            navigate("/paymentcompletion");
            setMessage("Success!");
            setSuccessful(true);
          })
          .catch((error) => {
            console.log(error);
            const errMessage = error.toString();

            setMessage(errMessage);
            setSuccessful(false);
          });
      }

      console.log(JSON.parse(json.body));
    } catch (error: any) {
      if (error.message) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }

      setSuccessful(false);
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <div className="mt-4">
            <FormBS.Group id="name" className="mb-4">
              <FormBS.Label>Your Name</FormBS.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Field name="name" type="text" className="form-control" />
              </InputGroup>
              <ErrorMessage
                name="name"
                component="div"
                className="alert alert-danger mt-1"
              />
            </FormBS.Group>
            <FormBS.Group id="email" className="mb-4">
              <FormBS.Label>Your Email</FormBS.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Field name="email" type="text" className="form-control" />
              </InputGroup>
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger mt-1"
              />
            </FormBS.Group>
            <FormBS.Group id="price_id" className="mb-4">
              <FormBS.Label>Select Subscription</FormBS.Label>
              <Field as={FormBS.Select} name="price_id">
                <option value={STRIPE_MS_PRICE_ID}>
                  Early Bird Offer (6-Month Pre-pay) - $299.99
                </option>
                <option value={STRIPE_BASIC_PRICE_ID}>
                  Monthly Subscription - $59.99
                </option>
              </Field>
              <ErrorMessage
                name="price_id"
                component="div"
                className="alert alert-danger mt-1"
              />
            </FormBS.Group>
            <FormBS.Group id="promo_code" className="mb-4">
              <FormBS.Label>Promotion Code</FormBS.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faTag} />
                </InputGroup.Text>
                <Field name="promo_code" type="text" className="form-control" />
              </InputGroup>
              <ErrorMessage
                name="promo_code"
                component="div"
                className="alert alert-danger mt-1"
              />
            </FormBS.Group>
          </div>
          <CardElement />
          <Button
            className="mt-4 w-100"
            disabled={loading || !stripe || !elements}
            id="submit"
            type="submit"
          >
            <span>{loading ? "Processing..." : "Pay now"}</span>
          </Button>
          {message && (
            <div className="d-flex justify-content-center text-center">
              <div
                className={
                  successful
                    ? "alert alert-success w-100 mt-2"
                    : "alert alert-danger w-100 mt-2"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </FormikForm>
      </Formik>
    </>
  );
};

export default PaymentForm;