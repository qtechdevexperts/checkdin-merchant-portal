import React, { useState } from "react";
import Select from "react-select";
import { AUTH_UPDATE_USER_HOURS } from "../constants";
import { Formik, Field, Form, ErrorMessage} from "formik";
import {
  Col,
  Row,
  Button,
  InputGroup,
  Form as FormBS,
  Card,
} from "@themesberg/react-bootstrap";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faDollarSign,
  faFileLines,
  faAngleLeft,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { RegisterValues } from "../types/auth.type";

const UpdateHours: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);

  const updateHours = async (formValue: any) => {
    const accessTkn = localStorage.getItem("accessToken") || "";

    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: JSON.parse(accessTkn),
        attributes: formValue,
      }),
    };
    console.log(requestBody)
    try {
      let response = await fetch(AUTH_UPDATE_USER_HOURS, requestBody);
      //let json = await response.json();

      console.log(response);

      //console.log(JSON.parse(json.body));
      setSuccessful(true);
      setMessage("Thank you for submitting.");
      return { success: true };
    } catch (e) {
      console.log(e);
      setSuccessful(false);
      setMessage("Error");
      return { success: false };
    }
  };

  const initialValues: {
    mon_open: string,
    mon_close: string,
    tue_open: string,
    tue_close: string,
    wed_open: string,
    wed_close: string,
    thu_open: string,
    thu_close: string,
    fri_open: string,
    fri_close: string,
    sat_open: string,
    sat_close: string,
    sun_open: string,
    sun_close: string
  } = {
    mon_open: "",
    mon_close: "",
    tue_open: "",
    tue_close: "",
    wed_open: "",
    wed_close: "",
    thu_open: "",
    thu_close: "",
    fri_open: "",
    fri_close: "",
    sat_open: "",
    sat_close: "",
    sun_open: "",
    sun_close: ""
  };

  const validationSchema = Yup.object().shape({
    mon_open: Yup.string(),
    mon_close: Yup.string(),
    tue_open: Yup.string(),
    tue_close: Yup.string(),
    wed_open: Yup.string(),
    wed_close: Yup.string(),
    thu_open: Yup.string(),
    thu_close: Yup.string(),
    fri_open: Yup.string(),
    fri_close: Yup.string(),
    sat_open: Yup.string(),
    sat_close: Yup.string(),
    sun_open: Yup.string(),
    sun_close: Yup.string()
  });

  return (
    <>
      <Card className="mt-4">
        <Card.Body>
          <h5 className="mb-4">Update Hours</h5>
          <p>Update your business hours</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateHours}
          >
            <Form>
              <div>
                <h6>Monday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="mon_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="mon_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="mon_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="mon_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <h6>Tuesday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="tue_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="tue_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="tue_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="tue_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <h6>Wednesday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="wed_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="wed_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="wed_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="wed_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <h6>Thursday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="thu_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="thu_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="thu_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="thu_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <h6>Friday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="fri_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="fri_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="fri_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="fri_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <h6>Saturday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="sat_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="sat_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="sat_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="sat_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div>
                <h6>Sunday</h6>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="sun_open" className="mb-4">
                      <FormBS.Label>Open</FormBS.Label>
                      <Field as={FormBS.Select} name="sun_open">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <FormBS.Group id="sun_close" className="mb-4">
                      <FormBS.Label>Close</FormBS.Label>
                      <Field as={FormBS.Select} name="sun_close">
                        <option value="12 AM">12 AM</option>
                        <option value="1 AM">1 AM</option>
                        <option value="2 AM">2 AM</option>
                        <option value="3 AM">3 AM</option>
                        <option value="4 AM">4 AM</option>
                        <option value="5 AM">5 AM</option>
                        <option value="6 AM">6 AM</option>
                        <option value="7 AM">7 AM</option>
                        <option value="8 AM">8 AM</option>
                        <option value="9 AM">9 AM</option>
                        <option value="10 AM">10 AM</option>
                        <option value="11 AM">11 AM</option>
                        <option value="12 PM">12 PM</option>
                        <option value="1 PM">1 PM</option>
                        <option value="2 PM">2 PM</option>
                        <option value="3 PM">3 PM</option>
                        <option value="4 PM">4 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="6 PM">6 PM</option>
                        <option value="7 PM">7 PM</option>
                        <option value="8 PM">8 PM</option>
                        <option value="9 PM">9 PM</option>
                        <option value="10 PM">10 PM</option>
                        <option value="11 PM">11 PM</option>
                        <option value="Closed">Closed</option>
                      </Field>
                    </FormBS.Group>
                  </Col>
                </Row>
              </div>
              <div className="mt-1 text-center">
                <Button className="w-50" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              {message && (
                <div className="d-flex justify-content-center text-center">
                  <div
                    className={
                      successful
                        ? "alert alert-success w-50 mt-3"
                        : "alert alert-danger w-50 mt-3"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpdateHours;
