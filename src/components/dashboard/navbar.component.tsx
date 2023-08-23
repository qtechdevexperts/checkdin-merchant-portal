import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Navbar,
  Container,
  Dropdown,
  Image,
} from "@themesberg/react-bootstrap";

import ExampleProfile from "../../assets/blank-user.jpg";
import { RoutePath } from "../../router/routes";
import { authSignoutConf } from "../../services/auth.service";
import { getProfilePicture } from "../../services/user.service";

const NavBar: React.FC = () => {

  const [img, setImg] = useState<string>()

  useEffect(() => {
    let accessTkn = localStorage.getItem("accessToken");
    let id = localStorage.getItem("merchantId")
    fetchProfile(id, accessTkn)
  }, [])

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
        if (response.data) {
          setImg(response.data.profile_img_url)
        }

      }
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   const getProfilePhoto = async () => {
  //     const response = await getProfilePicture();
  //     if (response) {
  //       setImg(`https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/${response}`);
  //     }
  //     else {
  //       setImg(ExampleProfile)
  //     }
  //   }

  //   getProfilePhoto()

  // })

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Nav.Item>
              <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
              CHEKDIN
            </Nav.Item>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src={img}
                    className="user-avatar md-avatar rounded-circle"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold"></span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item onClick={authSignoutConf} as={Link} to={RoutePath.Login.path}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
