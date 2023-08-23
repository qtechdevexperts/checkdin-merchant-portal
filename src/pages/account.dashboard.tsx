import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Card,
  Table,
} from "@themesberg/react-bootstrap";

import NavBar from "../components/dashboard/navbar.component";
import Sidebar from "../components/dashboard/sidebar.component";
import PhotoMenu from "../components/dashboard/photoMenu.component";
import ProfilePictureMenu from "../components/dashboard/profilePictureMenu.component";

import { AUTH_GET_USER_URL } from "../constants";
import { RoutePath } from "../router/routes";
import { Spinner } from "react-bootstrap";

import { sanitizeUserAttributes } from "../services/user.service";

const BusinessAccount: React.FC = () => {
  const [user, setUser] = useState<any[]>();
  const [hours, setHours] = useState<any>({});
  const [userLoaded, setUserLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userHash, setUserHash] = useState<Map<any, any>>()
  const [merchantProfile, setMerchantProfile]: any = useState({
    description: '',
    profile_img_url: ''
  })


  const fetchProfile = async (id: any, accessTkn: any) => {

    let res = await fetch(`https://api.chekdin.com/api/v1/merchant/get?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(accessTkn)}`
      }
    })
    try {
      if (res.ok) {
        let response = await res.json();
        console.log("res", response.data)
        setMerchantProfile(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  let accessTkn = localStorage.getItem("accessToken");
  useEffect(() => {
    let id = localStorage.getItem("merchantId")
    console.log("id", id)
    fetchProfile(id, accessTkn)
  }, [accessTkn])



  const fetchUser = async () => {
    let accessTkn = localStorage.getItem("accessToken") || "";



    let requestBody = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

      }),
    };

    try {
      let response = await fetch(AUTH_GET_USER_URL, requestBody);
      let json = await response.json();
      console.log(json);

      return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     // check if user is loaded
  //     setUserLoaded(false);

  //     // check for desktop size
  //     if (window.innerWidth < 767) {
  //       setIsMobile(true)
  //     }

  //     // grab the user
  //     let res = await fetchUser();
  //     console.log(res);

  //     // function to check window size
  //     const windowUpdate = async () => {
  //       if (window.innerWidth < 767) {
  //         setIsMobile(true)
  //       }
  //       else {
  //         setIsMobile(false);
  //       }
  //     }


  //     window.addEventListener('resize', windowUpdate);


  //     //
  //     if (res.success) {
  //       console.log(res.data.body);
  //       let response = JSON.parse(res.data.body);
  //       setUserHash(await sanitizeUserAttributes(response.UserAttributes))
  //       // console.log(userHash);


  //       // check to see if user ever updated their hours
  //       if (response.UserAttributes[9].Name === ("custom:business_hours")) {
  //         setHours(getHours(response.UserAttributes[9].Value))
  //       }
  //       else if (response.UserAttributes[8].Name === ("custom:business_hours")) {
  //         setHours(getHours(response.UserAttributes[8].Value))
  //       }
  //       else {
  //         setHours(
  //           {
  //             'sun_open': 'Cl',
  //             'sun_close': 'Cl',
  //             'mon_open': 'Cl',
  //             'mon_close': 'Cl',
  //             'tue_open': 'Cl',
  //             'tue_close': 'Cl',
  //             'wed_open': 'Cl',
  //             'wed_close': 'Cl',
  //             'thu_open': 'Cl',
  //             'thu_close': 'Cl',
  //             'fri_open': 'Cl',
  //             'fri_close': 'Cl',
  //             'sat_open': 'Cl',
  //             'sat_close': 'Cl',
  //           })
  //       }

  //       localStorage.setItem("userID", JSON.stringify(response.Username));
  //       localStorage.setItem("business_name", JSON.stringify(response.UserAttributes[6].Value));
  //       localStorage.setItem("business_address", JSON.stringify(response.UserAttributes[10].Value));
  //       setUser(response.UserAttributes);
  //       setUserLoaded(true);

  //     }

  //     return () => window.removeEventListener('resize', windowUpdate);
  //   })();
  // }, []);

  const getHours = (hours: any) => {
    let newHours = JSON.parse(hours);
    Object.keys(newHours).map((key, index) => {
      if (newHours[key] == "") {
        newHours[key] = newHours[key] = "12am"
      }
      if (newHours[key].includes(" AM")) {
        newHours[key] = newHours[key].replace(" AM", 'am')
      } else if (newHours[key].includes(" PM")) {
        newHours[key] = newHours[key].replace(" PM", 'pm')
      }
      if (newHours[key].includes("Closed")) {
        newHours[key] = "Cl"
      }
    })
    //console.log(newHours)
    //console.log(newHours.mon_open[0])
    return newHours
  }

  return (
    <div>
      <Sidebar />
      <div className="content">
        <NavBar />
        {isMobile && !userLoaded ? (
          <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <div className="d-block mb-4 mb-md-0">
                <h4>{userHash?.get('custom:business_name')}</h4>
                <p className="mb-0">View and manage business profile</p>
              </div>
              <Button
                as={Link}
                to={RoutePath.UpdateUser.path}
                className="me-2"
                variant="primary"
                size="lg"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="me-2" /> Edit Profile
              </Button>
            </div>
            <div className="d-flex flex-column mb-3">
              {/* Details */}
              <Card border="light" className="shadow-sm mb-4">
                <Card.Body>
                  <h3 className="mb-4">Business Description 1</h3>
                  <p>
                    {/* {userHash?.get('custom:business_volume')} */}
                    {/* {merchantProfile?.description ?? 'test'} */}
                    hello
                  </p>
                </Card.Body>
              </Card>

              {/* <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h3 className="mb-4">Hours</h3>
                <Table
                  bordered
                  hover
                  size="sm"
                  className="text-center mb-4"
                  responsive="sm"
                >
                <tbody>
                <tr>
                  <td>Su</td>
                  <td>M</td>
                  <td>T</td>
                  <td>W</td>
                  <td>Th</td>
                  <td>F</td>
                  <td>Sa</td>
                </tr>
                <tr>
                  <td>{hours.sun_open == "Cl" || hours.sun_close == "Cl" ? "Cl" : `${hours.sun_open}-${hours.sun_close}`}</td>
                  <td>{hours.mon_open == "Cl" || hours.mon_close == "Cl" ? "Cl" : `${hours.mon_open}-${hours.mon_close}`}</td>
                  <td>{hours.tue_open == "Cl" || hours.tue_close == "Cl" ? "Cl" : `${hours.tue_open}-${hours.tue_close}`}</td>
                  <td>{hours.wed_open == "Cl" || hours.wed_close == "Cl" ? "Cl" : `${hours.wed_open}-${hours.wed_close}`}</td>
                  <td>{hours.thu_open == "Cl" || hours.thu_close == "Cl" ? "Cl" : `${hours.thu_open}-${hours.thu_close}`}</td>
                  <td>{hours.fri_open == "Cl" || hours.fri_close == "Cl" ? "Cl" : `${hours.fri_open}-${hours.fri_close}`}</td>
                  <td>{hours.sat_open == "Cl" || hours.sat_close == "Cl" ? "Cl" : `${hours.sat_open}-${hours.sat_close}`}</td>
                </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card> */}

              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Contact</h5>
                  <p>{userHash?.get('phone_number')}</p>
                </Card.Body>
              </Card>

              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Address</h5>
                  <p>{userHash?.get('custom:business_address')}</p>
                </Card.Body>
              </Card>

              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Business Site/Social Media</h5>
                  <p>{userHash?.get('custom:business_website')}</p>
                </Card.Body>
              </Card>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Profile Picture</h5>
                  <ProfilePictureMenu image={merchantProfile.profile_img_url} />
                </Card.Body>
              </Card>
            </div>
          </div>
        ) : !userLoaded && !isMobile ? (
          <div>
            <div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                  <h4>{userHash?.get('custom:business_name')}</h4>
                  <p className="mb-0">View and manage business profile</p>
                </div>
                <Button
                  as={Link}
                  to={RoutePath.UpdateUser.path}
                  className="me-2"
                  variant="primary"
                  size="lg"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="me-2" />Edit Profile
                </Button>
              </div>
              <Row className="justify-content-md-center">
                <Col xs={6} className="px-2">
                  <Card border="light" className="shadow-sm">
                    <Card.Body>
                      <h3 className="mb-4">Business Description</h3>
                      <p>
                        {/* {userHash?.get('custom:business_volume')} */}
                        {merchantProfile.description}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} className="px-2">
                  <Card border="light" className="shadow-sm">
                    <Card.Body>
                      <h3 className="mb-4">Contact</h3>
                      {/* <p>{userHash?.get('phone_number')}</p> */}
                      <p>{merchantProfile.contact_number}</p>
                    </Card.Body>
                  </Card>
                </Col>
                {/* <Col xs={6} className="px-2">
                    <Card border="light" className="bg-white shadow-sm">
                      <Card.Body>
                        <h3 className="mb-4">Hours</h3>
                        <Table
                          bordered
                          hover
                          size="sm"
                          className="text-center mb-4"
                          responsive
                        >
                          <tbody>
                            <tr>
                              <td>Su</td>
                              <td>M</td>
                              <td>T</td>
                              <td>W</td>
                              <td>Th</td>
                              <td>F</td>
                              <td>Sa</td>
                            </tr>
                            <tr>
                              <td>{hours.sun_open == "Cl" || hours.sun_close == "Cl" ? "Cl" : `${hours.sun_open}-${hours.sun_close}`}</td>
                              <td>{hours.mon_open == "Cl" || hours.mon_close == "Cl" ? "Cl" : `${hours.mon_open}-${hours.mon_close}`}</td>
                              <td>{hours.tue_open == "Cl" || hours.tue_close == "Cl" ? "Cl" : `${hours.tue_open}-${hours.tue_close}`}</td>
                              <td>{hours.wed_open == "Cl" || hours.wed_close == "Cl" ? "Cl" : `${hours.wed_open}-${hours.wed_close}`}</td>
                              <td>{hours.thu_open == "Cl" || hours.thu_close == "Cl" ? "Cl" : `${hours.thu_open}-${hours.thu_close}`}</td>
                              <td>{hours.fri_open == "Cl" || hours.fri_close == "Cl" ? "Cl" : `${hours.fri_open}-${hours.fri_close}`}</td>
                              <td>{hours.sat_open == "Cl" || hours.sat_close == "Cl" ? "Cl" : `${hours.sat_open}-${hours.sat_close}`}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col> */}
              </Row>
              <Row>
                <Col xs={6} className="px-2 mt-2">
                  <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                      <h3 className="mb-4">Address</h3>
                      {/* <p>{userHash?.get('custom:business_address')}</p> */}
                      <p>{merchantProfile.address}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} className="px-2 mt-2">
                  <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                      <h3 className="mb-4">Business Site/Social Media</h3>
                      {/* <p>{userHash?.get('custom:business_website')}</p> */}
                      <p>{merchantProfile.website}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col xs={12} className="px-2 mt-2 text-align-center">
                  <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-4">Profile Picture</h5>
                      <ProfilePictureMenu image={merchantProfile.profile_img_url} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        ) :
          (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <h4>Loading</h4>
            </div>
          )}
      </div>
    </div>
  )
};

export default BusinessAccount;
