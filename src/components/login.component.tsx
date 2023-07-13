import React, { useState } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Col,
  Row,
  Form as FormBS,
  InputGroup,
  Button,
  Card,
} from "@themesberg/react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { auth_login } from "../services/auth.service";
import { RoutePath } from "../router/routes";
import BgImage from "../assets/signin.svg";

type Props = {};

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required."),
    password: Yup.string().required("This field is required"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setLoading(true);

    // auth_login(username, password)
    //   .then((res: any) => {
    //     setLoading(false);
    //     console.log(res);

    //     if (res.errorType) {
    //       setMessage(res.errorMessage);
    //       console.log(message);
    //       throw new Error(res.errorMessage);
    //     }
    //     navigate("/");
    //     window.location.reload();
    //   })
    //   .catch((e: any) => {
    //     console.log(e);
    //   });
  };

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
                  <h3 className="mb-0">Sign in to ChekdIn</h3>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(formData) => {
                    handleLogin(formData);
                  }}
                >
                  <Form>
                    <div className="mt-4">
                      <FormBS.Group id="username" className="mb-4">
                        <FormBS.Label>Email</FormBS.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Field
                            name="username"
                            type="text"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="alert alert-danger"
                        />
                      </FormBS.Group>
                      <FormBS.Group id="password" className="mb-4">
                        <FormBS.Label>Password</FormBS.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Field
                            name="password"
                            type="password"
                            className="form-control"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="alert alert-danger"
                        />
                      </FormBS.Group>
                      <FormBS.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                          disabled={loading}
                        >
                          {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Login</span>
                        </Button>
                      </FormBS.Group>
                      {message && (
                        <div className="alert alert-danger mt-2 text-center" role="alert">
                          {message}
                        </div>
                      )}
                    </div>
                  </Form>
                </Formik>

                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={RoutePath.Register.path}
                      className="fw-bold"
                    >
                      {` Create an account `}
                    </Card.Link>
                  </span>
                </div> */}
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <span className="fw-normal">
                    Forgot Password?
                    <Card.Link
                      as={Link}
                      to={RoutePath.ForgotPassword.path}
                      className="fw-bold"
                    >
                      {` Reset your password `}
                    </Card.Link>
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

export default Login;