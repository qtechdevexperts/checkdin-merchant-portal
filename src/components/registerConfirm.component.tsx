import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Button,
  Form as FormBS,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { RegisterConf } from "../types/auth.type";
import { auth_signup_conf } from "../services/auth.service";

const RegisterConfirmation: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: RegisterConf = {
    code: ""
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required(),
  });

  const handleSubmit = (formValue: RegisterConf) => {
    const { code } = formValue;

    const username = localStorage.getItem("registerUsername") || "";

    auth_signup_conf(code, username)
        .then((res) => {
            console.log(res);
            navigate("/login");
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Enter your Confirmation Code</h3>
                  <p className="mt-2">
                    A Confirmation code has been sent to your email
                  </p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  <Form>
                    {!successful && (
                      <div className="mt-4">
                        <FormBS.Group id="code" className="mb-4">
                          <FormBS.Label>Your Code</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faHashtag} />
                            </InputGroup.Text>
                            <Field
                              name="code"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="code"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <Button
                          variant="primary"
                          className="w-100"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    )}
                    {message && (
                      <FormBS>
                        <div
                          className={
                            successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {message}
                        </div>
                      </FormBS>
                    )}
                  </Form>
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default RegisterConfirmation;
