/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Button, Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";
import Swal from "sweetalert2";

import { FloatingInput } from "components";

import { askQuestion } from "api/Contact";

import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";

import "./contact.css";

const ContactSection = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handleSubject = (value) => {
    setSubject(value);
  };
  const handleMessage = (value) => {
    setMessage(value);
  };
  const handleQuery = async () => {
    const values = {
      email: email,
      subject: subject,
      message: message,
    };
    const withJWT = false;
    enableLoading();
    try {
      const {
        data: { message },
      } = await postRequest(askQuestion(), values, withJWT);
      disableLoading();
      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (e) {
      Swal.fire({
        text: e.response.data.message,
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
    }
  };
  return (
    <>
      <Container fluid="md" id="contact">
        <h1 className="section-header">Contact Us</h1>

        <Row>
          <Col xs={12} md={6}>
            <Form className=" mb-3">
              <div className="form-group">
                <div className="col-sm-12">
                  <FloatingInput
                    controlId=""
                    label="Email"
                    type="text"
                    name="search"
                    placeholder="search"
                    // eslint-disable-next-line no-restricted-globals
                    onChange={() => handleEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-12">
                  <FloatingInput
                    controlId=""
                    label="Subject"
                    type="text"
                    name="search"
                    placeholder="search"
                    // eslint-disable-next-line no-restricted-globals
                    onChange={() => handleSubject(event.target.value)}
                  />
                </div>
              </div>

              <textarea
                className="form-control mb-2"
                rows="10"
                placeholder="MESSAGE"
                name="message"
                required
                // eslint-disable-next-line no-restricted-globals
                onChange={() => handleMessage(event.target.value)}
              ></textarea>

              <Button
                variant="primary"
                type="button"
                className="d-flex justify-content-center align-items-center align-self-center w-100 p-3"
                onClick={handleQuery}
              >
                SEND {isLoading && <Spinner animation="border" role="status" />}
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            {" "}
            <div className="direct-contact-container">
              <ul className="contact-list">
                <li className="list-item">
                  <FontAwesomeIcon icon={Icons.faMapMarker} />
                  <span className="contact-text place">City, State</span>
                </li>

                <li className="list-item">
                  <FontAwesomeIcon icon={Icons.faPhone} />
                  <span className="contact-text phone">
                    <a href="tel:1-212-555-5555" title="Give me a call">
                      (212) 555-2368
                    </a>
                  </span>
                </li>

                <li className="list-item">
                  <FontAwesomeIcon icon={Icons.faEnvelope} />
                  <span className="contact-text gmail">
                    <a href="mailto:#" title="Send me an email">
                      hitmeup@gmail.com
                    </a>
                  </span>
                </li>
              </ul>

              <hr />
              <ul className="social-media-list">
                <li>
                  <a href="#" target="_blank" className="contact-icon">
                    <FontAwesomeIcon icon={Icons.faEnvelope} />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" className="contact-icon">
                    <FontAwesomeIcon icon={Icons.faAddressBook} />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" className="contact-icon">
                    <FontAwesomeIcon icon={Icons.faMapMarker} />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" className="contact-icon">
                    <FontAwesomeIcon icon={Icons.faInfo} />
                  </a>
                </li>
              </ul>
              <hr />

              <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactSection;
