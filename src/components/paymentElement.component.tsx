import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { faUser, faTag } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Row,
  Col,
  Container,
  Form as FormBS,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { auth_register } from "../services/auth.service";
import { STRIPE_UPDATE_CUSTOMER_URL, STRIPE_MS_PRICE_ID, STRIPE_CONFIG_URL, STRIPE_BASIC_PRICE_ID } from "../constants";

const PaymentSetup: React.FC = () => {
  const [message, setMessage] = useState<any>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const initialValues: {
    name: string;
    sub_type: string;
    promo_code: string;
  } = {
    name: "",
    sub_type: `${STRIPE_MS_PRICE_ID}`,
    promo_code: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required."),
    sub_type: Yup.string().required("This field is required"),
    promo_code: Yup.string(),
  });

  const handleSubmit = async (formValues: any) => {
    const { name, sub_type, promo_code } = formValues;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    try {
      const email = localStorage.getItem("registerUsername") || "";
      const password = localStorage.getItem("registerPassword") || "";
      const business_name = localStorage.getItem("business_name") || "";
      const business_address = localStorage.getItem("business_address") || "";
      const business_volume = localStorage.getItem("business_volume") || "";
      const business_facebook = localStorage.getItem("business_facebook") || "";
      const business_twitter = localStorage.getItem("business_twitter") || "";
      const business_instagram =
        localStorage.getItem("business_instagram") || "";
      const business_website = localStorage.getItem("business_website") || "";
      const phone_number = localStorage.getItem("phone_number") || "";
      const customer_id = localStorage.getItem("customer_id") || "";

      console.log(password);

      let requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customer_id,
          email: email,
          name: name,
          phone_number: phone_number,
          sub_type: sub_type,
          promo_code: promo_code
        }),
      };

      let response = await fetch(STRIPE_UPDATE_CUSTOMER_URL, requestBody);

      let json = await response.json();

      console.log(json);

      if (json.body.errorMessage) {
        throw new Error(json.body.errorMessage);
      }

      await auth_register(
        email,
        password,
        phone_number,
        business_name,
        business_address,
        business_website,
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

          setMessage("Success!");
          setSuccessful(true);
        })
        .catch((error) => {
          console.log(error);
          const errMessage = error.toString();

          setMessage(errMessage);
          setSuccessful(false);
        });
      const { error } = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/paymentcompletion`,
          payment_method_data: {
            billing_details: {
              email: email,
              name: business_name,
              phone: phone_number,
            },
          },
        },
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setMessage(error.message);
        setSuccessful(false);
      } else {
        setSuccessful(true);
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
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
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
          >
            <Col
              xs={12} lg={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <u className="h4 text-primary mb-5">
                    PRE-LAUNCH SPECIAL (6 Months)*
                  </u>
                  <h1 className="text-primary mb-2 mt-2">$299.99</h1>
                  <p className="lead mb-2">
                    Use code <u>CHKDN30OFF</u> for %30 OFF**
                  </p>
                  <h5 className="text-primary mb-2">
                    Take advantage, save and be ahead of the game.
                  </h5>
                </div>

                <ul>
                  <li className="lead">Early access to the merchant portal.</li>
                  <li className="lead">
                    Create company profile, bio and upload pictures.
                  </li>
                  <li className="lead">
                    Create your coupons. Pre-schedule your user Chekdin coupons
                    and Viewer coupons, have them ready for user launch day.
                  </li>
                  <li className="lead">
                    Take this time to educate your staff on Chekdin and your
                    offered coupons.
                  </li>
                </ul>

                <div className="text-center text-md-center mb-4 mt-md-0">
                  <p className="mb-2" style={{ fontSize: "0.8rem" }}>
                    *Subscribers will not be charged until user launch date
                    1/15/2023. Offer ends 1/16/2023.
                  </p>
                  <p className="mb-2" style={{ fontSize: "0.8rem" }}>
                    **Offer ends March 15th 2023.
                  </p>
                </div>
              </div>
            </Col>
            <Col
              xs={12} lg={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Enter your Payment Information</h3>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="mt-4">
                      <FormBS.Group id="name" className="mb-4">
                        <FormBS.Label>Name</FormBS.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="alert alert-danger mt-1"
                        />
                      </FormBS.Group>
                      <FormBS.Group id="sub_type" className="mb-4">
                        <FormBS.Label>Subscription</FormBS.Label>
                          <Field
                            as={FormBS.Select}
                            name="sub_type"
                            type="text"
                            className="form-control"
                          >
                            <option value={STRIPE_MS_PRICE_ID}>6-Month Subscription - $299.99</option>
                            <option value={STRIPE_BASIC_PRICE_ID}>Monthly Subscription - $59.99</option>
                          </Field>
                        <ErrorMessage
                          name="sub_type"
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
                          <Field
                            name="promo_code"
                            type="text"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="promo_code"
                          component="div"
                          className="alert alert-danger mt-1"
                        />
                      </FormBS.Group>
                      <PaymentElement />
                      <div className="mt-3">
                        <Button
                          className="w-100"
                          disabled={loading || !stripe}
                          type="submit"
                        >
                          <span>{loading ? "Processing..." : "Submit"}</span>
                        </Button>
                      </div>
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
                    </div>
                  </Form>
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PaymentSetup;
