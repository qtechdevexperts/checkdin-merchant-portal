import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import {
  Row,
  Col,
  Container,
  Card,
  Table,
  Dropdown,
  ButtonGroup,
  Button,
} from "@themesberg/react-bootstrap";
import {
  faEllipsisH,
  faTrashAlt,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GET_ITEMS_COUPON_MANAGER_URL,
  DELETE_ITEM_COUPON_MANAGER_URL,
  ACTIVE_ITEM_COUPON_MANAGER_URL,
  QR_CODE_COUPON_URL,
} from "../../constants";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const CouponManagerTable: React.FC = () => {
  const [table, setTable] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [QRvalue, setQRValue] = useState<string>("Activate Coupon");
  const [isQRCode, setQRCodeExist] = useState<boolean>(false);
  const [tableLoaded, setTableLoaded] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [modalShow, setModalShow] = React.useState(false);
  const qrCodeRef: any = useRef(null);

  const fetchCoupens = async () => {
    let accessTkn = localStorage.getItem("accessToken") || "";
    const res = await fetch(
      "https://api.chekdin.com/api/v1/coupon/my-coupons",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(accessTkn)}`,
        },
      }
    );
    let response = await res.json();
    try {
      if (res.ok && response) {
        // console.log("data", response.data)
        setTable(response.data);
        setData(response.data);
      }
    } catch (err) {
      console.log("error fetching coupens", err);
    }
  };
  let todayDate: Date | string;
  useEffect(() => {
    fetchCoupens();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    todayDate = `${year}-${month}-${day}`;
  }, []);

  const handleDownload = () => {
    const qrCodeBlob = new Blob([qrCodeRef?.current?.outerHTML], {
      type: "text/html",
    });
    const url = URL.createObjectURL(qrCodeBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.html";
    link.click();
  };

  const handlePrint: any = () => {
    const printWindow: any = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print QR Code</title></head><body>"
    );
    printWindow.document.write(qrCodeRef.current.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const fetchTable = async () => {
    let userID = localStorage.getItem("userID") || "";

    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // user_id: JSON.parse(userID),
        user_id: userID,
      }),
    };

    try {
      let response = await fetch(GET_ITEMS_COUPON_MANAGER_URL, requestBody);
      let json = await response.json();
      const ITEMS = JSON.parse(json.body);

      getQRCode();

      return { success: true, data: ITEMS };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const getQRCode = async () => {
    let userID = localStorage.getItem("userID") || "";
    let business_name = localStorage.getItem("business_name") || "";
    let business_address = localStorage.getItem("business_address") || "";

    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: JSON.parse(userID),
        business_name: JSON.parse(business_name),
        business_address: JSON.parse(business_address),
      }),
    };

    try {
      let response = await fetch(QR_CODE_COUPON_URL, requestBody);
      let json = await response.json();
      let URL = JSON.parse(json.body);

      setQRValue(URL);
      setQRCodeExist(true);
    } catch (error) {
      setQRCodeExist(false);
      console.log(error);
    }
  };

  const activateItem = async (UID: string, coupon_type: string) => {
    let userID = localStorage.getItem("userID") || "";

    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UID: UID,
        user_id: JSON.parse(userID),
        coupon_type: coupon_type,
      }),
    };

    try {
      let response = await fetch(ACTIVE_ITEM_COUPON_MANAGER_URL, requestBody);

      console.log(response);

      let res = await fetchTable();

      if (res.success) {
        setTable(res.data);
        setTableLoaded(true);
      } else {
        setTableLoaded(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (UID: string | number) => {
    let accessTkn = localStorage.getItem("accessToken") || "";
    let requestBody = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(accessTkn)}`,
      },
    };

    try {
      let response = await fetch(
        `${DELETE_ITEM_COUPON_MANAGER_URL}?id=${UID}`,
        requestBody
      );
      console.log(response);

      setIsDeleted(true);
      let res = await fetchTable();
      fetchCoupens();
      if (res.success) {
        setTable(res.data);
        setTableLoaded(true);
      } else {
        setTableLoaded(false);
      }
    } catch (e) {
      console.log(e);
      setIsDeleted(false);
    }
  };

  useEffect(() => {
    (async () => {
      let res = await fetchTable();
      if (res.success) {
        console.log(res);
        setTable(res.data);
        setTableLoaded(true);
      } else {
        setTableLoaded(false);
      }

      // check for desktop size
      if (window.innerWidth < 767) {
        setIsMobile(true);
      }

      // function to check window size
      const windowUpdate = async () => {
        if (window.innerWidth < 767) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      window.addEventListener("resize", windowUpdate);
      return () => window.removeEventListener("resize", windowUpdate);
    })();
  }, []);

  return (
    <div>
      <Card
        border="light"
        className="table-wrapper table-responsive shadow-sm mb-3"
      >
        <Card.Header>
          <b>Viewer Coupon Table</b>
        </Card.Header>
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                {/* <th className="border-bottom">Time Created</th> */}
                <th className="border-bottom">Coupon ID</th>
                <th className="border-bottom">Tag</th>
                <th className="border-bottom">Terms</th>
                <th className="border-bottom">Start Date</th>
                <th className="border-bottom">End Date</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, i) => {
                  console.log("item", item);
                  let tag = "";
                  let status = "";

                  if (item.coupon_type === "User Coupon") {
                    if (item.discount_type === "Fixed") {
                      tag = "$" + item.discount_amount ?? 0 + " Off";
                    } else {
                      tag = item.discount_amount ?? 0 + "%" + " Off";
                    }

                    if (
                      new Date(item.expiry_date) > new Date() &&
                      new Date() > new Date(item.start_date)
                    ) {
                      status = "Active";
                    } else {
                      status = "Inactive";
                    }
                    return (
                      <tr key={i}>
                        {/* <td>
                          <span className="fw-normal">{'item.timeStamp'}</span>
                        </td> */}
                        <td>
                          <span className="fw-normal">{item.coupon_code}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{tag}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{item.offer_title}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{item.start_date}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{item.expiry_date}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{status}</span>
                        </td>
                        <td>
                          <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle
                              as={Button}
                              split
                              variant="link"
                              className="text-dark m-0 p-0"
                            >
                              <span className="icon icon-sm">
                                <FontAwesomeIcon
                                  icon={faEllipsisH}
                                  className="icon-dark"
                                />
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                as={Button}
                                onClick={() => {
                                  deleteItem(item.id);
                                  if (item.isActive) {
                                    setQRValue("Activate Coupon");
                                  }
                                }}
                                className="text-danger"
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="me-2"
                                />
                                Remove
                              </Dropdown.Item>
                              <Dropdown.Item
                                as={Button}
                                onClick={() => {
                                  setQRValue(
                                    `{id:${item.id},name:${item.name}}`
                                  );
                                  setModalShow(true);
                                }}
                                className="text-primary"
                              >
                                <FontAwesomeIcon
                                  icon={faPowerOff}
                                  className="me-2"
                                />
                                Generate QR
                              </Dropdown.Item>
                              <Dropdown.Item
                                as={Button}
                                className="text-primary"
                              >
                                <FontAwesomeIcon
                                  icon={faPowerOff}
                                  className="me-2"
                                />

                                <Link
                                  to={`/history/${item.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Redeem History
                                </Link>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  } else {
                    return <></>;
                  }
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card
        border="light"
        className="table-wrapper table-responsive shadow-sm mb-3"
      >
        <Card.Header>
          <b>Chekdin Coupon Table</b>
        </Card.Header>

        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                {/* <th className="border-bottom">Time Created</th> */}
                <th className="border-bottom">Coupon ID</th>
                <th className="border-bottom">Tag</th>
                <th className="border-bottom">Terms</th>
                <th className="border-bottom">Start Date</th>
                <th className="border-bottom">End Date</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Actions</th>
              </tr>
            </thead>
            <tbody>
              {table ? (
                table.map((item, i) => {
                  let tag = "";
                  let status = "";

                  if (item.coupon_type === "Chekdin Coupon") {
                    if (item.discount_type === "Fixed") {
                      tag = "$" + item.discount_amount + " Off";
                    } else {
                      tag = item.discount_amount + "%" + " Off";
                    }

                    if (
                      new Date(item.expiry_date) > new Date() &&
                      new Date() > new Date(item.start_date)
                    ) {
                      status = "Active";
                    } else {
                      status = "Inactive";
                    }
                    return (
                      <tr key={i}>
                        {/* <td>
                          <span className="fw-normal">{item.timeStamp}</span>
                        </td> */}
                        <td>
                          <span className="fw-normal">{item.coupon_code}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{tag}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{item.offer_title}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{item.start_date}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{item.expiry_date}</span>
                        </td>
                        <td>
                          <span className="fw-normal">{status}</span>
                        </td>
                        <td>
                          <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle
                              as={Button}
                              split
                              variant="link"
                              className="text-dark m-0 p-0"
                            >
                              <span className="icon icon-sm">
                                <FontAwesomeIcon
                                  icon={faEllipsisH}
                                  className="icon-dark"
                                />
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                as={Button}
                                onClick={() => {
                                  deleteItem(item.id);
                                  if (item.isActive) {
                                    setQRValue("Activate Coupon");
                                  }
                                }}
                                className="text-danger"
                              >
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="me-2"
                                />
                                Remove
                              </Dropdown.Item>
                              <Dropdown.Item
                                as={Button}
                                onClick={() => {
                                  setQRValue(
                                    `{id:${item.id},name:${item.name}}`
                                  );
                                  setModalShow(true);
                                }}
                                className="text-primary"
                              >
                                <FontAwesomeIcon
                                  icon={faPowerOff}
                                  className="me-2"
                                />
                                Generate QR
                              </Dropdown.Item>
                              <Dropdown.Item
                                as={Button}
                                className="text-primary"
                              >
                                <FontAwesomeIcon
                                  icon={faPowerOff}
                                  className="me-2"
                                />

                                <Link
                                  to={`/history/${item.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  Redeem History
                                </Link>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  } else {
                    return <></>;
                  }
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {isMobile ? (
        <Modal
          show={isMobile && modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              QR Code
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-md-center text-center">
              <Card>
                <Card.Body>
                  <h3>QR Code</h3>
                  <Container>
                    <QRCode
                      size={480}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={QRvalue}
                      viewBox={`0 0 256 256`}
                      ref={qrCodeRef}
                    />
                  </Container>
                  <Row className="justify-content-md-center">
                    <Col className="text-center">
                      <p>
                        {isQRCode
                          ? "Make sure a Viewer Coupon and a Chekdin Coupon is active."
                          : ""}
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Button
                      // onClick={() => {
                      //   alert(
                      //     "Download your QR code when the mobile app goes live."
                      //   );
                      // }}
                      onClick={handlePrint}
                    >
                      Download
                    </Button>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col className="text-center">
                      <p>
                        Please print and place QR Code where your chekdin users
                        can easily see and scan.
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal
          show={!isMobile && modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              QR CODE
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-md-center">
              <Col xs={6} className="px-2 mt-2">
                <Card border="light" className="shadow-sm">
                  <Card.Body>
                    <h3>QR Code</h3>
                    <Container>
                      <div
                        style={{
                          height: "auto",
                          margin: "0 auto",
                          maxWidth: 128,
                          width: "100%",
                        }}
                      >
                        <QRCode
                          size={512}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={QRvalue}
                          viewBox={`0 0 512 512`}
                          ref={qrCodeRef}
                        />
                      </div>
                      <Row className="justify-content-md-center mt-2">
                        <Col className="text-center">
                          <p>
                            {isQRCode
                              ? ""
                              : "Make sure a Viewer Coupon and a Chekdin Coupon is active."}
                          </p>
                        </Col>
                      </Row>
                      <div className="mt-1">
                        <Row className=" justify-content-md-center">
                          <Button
                            // onClick={() => {
                            //   alert(
                            //     "Download your QR code when the mobile app goes live."
                            //   );
                            // }}
                            onClick={handlePrint}
                          >
                            Download
                          </Button>
                        </Row>
                      </div>
                      <Row className="justify-content-md-center mt-2">
                        <Col className="text-center">
                          <p>
                            Please print and place QR Code where your chekdin
                            users can easily see and scan.
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default CouponManagerTable;
