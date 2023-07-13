import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage} from "formik";
import { Row, Col, Form as FormBS, InputGroup, Button, Card, Image} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import "yup-phone";
import { AUTH_UPDATE_USER_URL } from "../constants";
import { RoutePath } from "../router/routes";
import Uploader from "./uploader.component";
import UpdateHours from "./updateHours.component";
import ProfilePictureUploader from "./profilePictureUploader.component";

const UpdatedUser: React.FC = () => {
  
  // State Variables 
  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const inputRef = useRef(null)

  // configurations
  const initialValues: {
    business_name: string;
    business_volume: string;
    business_website: string;
    business_address: string;
    phone_number: string;
  } = {
    business_name: "",
    business_volume: "",
    business_website: "",
    business_address: "",
    phone_number: "",
  };

  var scheduleData = 
  {
    Monday:
    {
      Open: "",
      Close: "" 
    },
    Tuesday:
    {
      Open: "",
      Close: "" 
    },    
    Wednesday:
    {
      Open: "",
      Close: "" 
    },
    Thursday:
    {
      Open: "",
      Close: "" 
    },
    Friday:
    {
      Open: "",
      Close: "" 
    },
    Saturday:
    {
      Open: "",
      Close: "" 
    },
    Sunday:
    {
      Open: "",
      Close: "" 
    }
  }

  const fileTypes = ["JPG", "PNG", "GIF"];
  

  // Validation and Upload Functions
  const validationSchema = Yup.object().shape({
    business_name: Yup.string().max(256, "Max 256 characters"),
    business_volume: Yup.string()
      .max(256, "Max 256 characters"),
    business_website: Yup.string().max(256, "Max 256 characters"),
    business_address: Yup.string(),
    phone_number: Yup.string()
      .phone("US", true, "Please enter a valid phone number.")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(10, "Only ten digits are allowed")
  });

  // Function
  const updateUser = async (formValue: any) => {
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

    try {
      let response = await fetch(AUTH_UPDATE_USER_URL, requestBody);
      let json = await response.json();

      console.log(response);

      console.log(JSON.parse(json.body));
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
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <p className="text-center">
            <Card.Link
              as={Link}
              to={RoutePath.BusinessAccount.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              Company Profile
            </Card.Link>
          </p>
        </div>
      </div>
      <Card>
        <Card.Body>
          <h5 className="mb-4">Update Profile Picture</h5>
          <ProfilePictureUploader/>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <h5 className="mb-4">Edit Profile</h5>
          <p>Update your company profile</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateUser}
          >
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="business_name" className="mb-4">
                    <FormBS.Label>Business Name</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Field
                        name="business_name"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="business_name"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="business_website" className="mb-4">
                    <FormBS.Label>Business Website</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Field
                        name="business_website"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="business_website"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={4} className="mb-3">
                  <FormBS.Group id="business_volume" className="mb-4">
                    <FormBS.Label>Business Description</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Field
                        name="business_volume"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="business_volume"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <FormBS.Group id="phone_number" className="mb-4">
                    <FormBS.Label>Phone Number</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Field
                        name="phone_number"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="phone_number"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <FormBS.Group id="business_address" className="mb-4">
                    <FormBS.Label>Business Address</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text></InputGroup.Text>
                      <Field
                        name="business_address"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="business_address"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center"></Row>
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

      {/* Uploading Hours */}
      <UpdateHours />

      {/* Uploader  */}
    </>
  );
};

export default UpdatedUser;
