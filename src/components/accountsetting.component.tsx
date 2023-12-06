import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Col, Row, Form as FormBS, InputGroup, Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { RoutePath } from "../router/routes";
import Sidebar from "./dashboard/sidebar.component";
import NavBar from "./dashboard/navbar.component";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { MERCHANT_USER_GET, MERCHANT_USER_UPDATE } from "../constants";
const AccountSetting: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [successful, setSuccessful] = useState<boolean>(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [userHash, setUserHash] = useState<Map<any, any>>()
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone_number, setPhoneNumber] = useState<string>("");

    const [merchantProfile, setMerchantProfile] = useState({
        id: 0,
        name: "",
        contact_number: "",
        address: "",
        email: "",
        user_name: "",
        current_password: "",
        new_password: "",
    });

    const formikRef: any = useRef(null);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        contact_number: Yup.string().required("Contact number is required"),
        address: Yup.string().required("Address is required"),
        email: Yup.string().email("Invalid email").required("Email is required")
    });

    const passwordValidationSchema = Yup.object().shape({
        current_password: Yup.string()
            .max(8, "Password must be at least 8 characters long"),
        new_password: Yup.string()
            .min(8, "Password must be at least 8 characters long"),
    });

    let passwordInitialValues: {
        current_password: string;
        new_password: string;
    } = {
        current_password: "",
        new_password: ""
    }
    
    useEffect(() => {
        let accessTkn = localStorage.getItem("accessToken");
        let id = localStorage.getItem("merchantId");
        console.log("id", id);
        fetchProfile(id, accessTkn);
    }, []);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        
      };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };
  

    
    const fetchProfile = async (id: any, accessTkn: any) => {
        let res = await fetch(
            `${MERCHANT_USER_GET}?id=${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(accessTkn)}`,
                },
            }
        );
        try {
            if (res.ok) {
                let response = await res.json();
                console.log("res", response.data);
                setMerchantProfile(response.data);
                formikRef.current.setValues({
                    name: response.data.name,
                    email: response.data.email,
                    address: response.data.address,
                    phone_number: response.data.contact_number,
                });

                setName(response.data.name)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setPhoneNumber(response.data.contact_number)
            }
        } catch (err) {
            console.log(err);
        }
    };

 
    // configurations
    let initialValues: {
        name: string;
        address: string;
        phone_number: string;
        email: string;
        user_name: string;
    } = {
        name: merchantProfile.name,
        address: merchantProfile.address,
        phone_number: merchantProfile.contact_number,
        email: merchantProfile.email,
        user_name: merchantProfile.email
    };

    const updateUser = async (formValue: any) => {
        let formData = new FormData();
        const accessTkn = localStorage.getItem("accessToken") || "";
        let id = localStorage.getItem("merchantId");
        formData.append("id",parseInt(id || '0', 10).toString());
        formData.append("name", name);
        formData.append("contact_number", phone_number);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("new_password", formValue.new_password == undefined? null :  formValue.new_password);
        formData.append("current_password", formValue.current_password);
        try {
            const response = await fetch(MERCHANT_USER_UPDATE, {
                method: "PATCH",
                headers: {
                    // "content-type": "multipart/form-data; boundary=------WebKitFormBoundaryaM6nZ8doKkK6IJxi",
                    Authorization: `Bearer ${JSON.parse(accessTkn)}`,
                },
                body: formData,
            });
            const responseData = await response.json();
            if (response.ok) {
                setMessage("Account Settings Saved Successfully");
                setSuccessful(true)
            } else {
                setMessage(responseData.data.message);
                setSuccessful(false)
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <div>
                <Sidebar />
                <div className="content">
                    <NavBar />
                    <div>
                        
                    </div>
                    <Card className="mt-4">
                        <Card.Body>
                            <h5 className="mb-4">Account Settings</h5>
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={updateUser}
                                innerRef={formikRef}
                            >
                                <Form>
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="name" className="mb-4">
                                                <FormBS.Label>Name</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={handleNameChange}
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="alert alert-danger mt-1"
                                                />
                                            </FormBS.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="business_website" className="mb-4">
                                                <FormBS.Label>Email</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="email"
                                                        type="text"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </FormBS.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="business_website" className="mb-4">
                                                <FormBS.Label>User Name</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="user_name"
                                                        type="text"
                                                        className="form-control"
                                                        disabled={true}
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="user_name"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </FormBS.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                    </Row>
                                    <Row className="align-items-center">
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="business_volume" className="mb-4">
                                                <FormBS.Label>Mailing Address</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="address"
                                                        type="text"
                                                        className="form-control"
                                                        value={address}
                                                        onChange={handleAddressChange}
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="address"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </FormBS.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="phone_number" className="mb-4">
                                                <FormBS.Label>Phone</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="phone_number"
                                                        type="text"
                                                        className="form-control"
                                                        value={phone_number}
                                                        onChange={handlePhoneChange}
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="phone_number"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </FormBS.Group>

                                        </Col>
                                        <Col>
                                        </Col>
                                    </Row>
                                    <Row>


                                    </Row>
                                    <Row className="align-items-center"></Row>
                                </Form>
                            </Formik>

                        </Card.Body>
                    </Card>
                    <Row>

                    </Row>

                    <Card className="mt-4">
                        <Card.Body>
                        <h5 className="mb-4">Change Password</h5>
                        <Formik
                                enableReinitialize
                                initialValues={passwordInitialValues}
                                validationSchema={passwordValidationSchema}
                                onSubmit={updateUser}
                                innerRef={formikRef}
                            >
                                <Form>
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="current_password" className="mb-4">
                                                <FormBS.Label>Current Password</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="current_password"
                                                        type="password"
                                                        className="form-control"
                                                        maxLength="8"
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="current_password"
                                                    component="div"
                                                    className="alert alert-danger mt-1"
                                                />
                                            </FormBS.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <FormBS.Group id="new_password" className="mb-4">
                                                <FormBS.Label>New Password</FormBS.Label>
                                                <InputGroup>
                                                    <InputGroup.Text></InputGroup.Text>
                                                    <Field
                                                        name="new_password"
                                                        type="password"
                                                        className="form-control"
                                                        maxLength="8"
                                                    />
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="new_password"
                                                    component="div"
                                                    className="alert alert-danger"
                                                />
                                            </FormBS.Group>
                                        </Col>
                                    </Row>
                                    <Row className="align-items-center">
                                        <Col md={12}>
                                        <div className="mt-1 text-left">
                                                <Button className="w-10 mb-3" variant="primary" type="submit">
                                                    Save Account Settings
                                                </Button>
                                                {message && (
                                                <div className="d-flex justify-content-center text-center">
                                                    <div
                                                        className={
                                                            successful
                                                                ? "alert alert-success w-50"
                                                                : "alert alert-danger w-50"
                                                        }
                                                        role="alert"
                                                    >
                                                        {message}
                                                    </div>
                                                </div>
                                            )}
                                            </div>
                                           
                                            </Col>
                                    </Row>
                                    <Row>


                                    </Row>


                                </Form>
                            </Formik>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </>
    );
};

export default AccountSetting;
