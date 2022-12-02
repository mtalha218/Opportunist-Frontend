/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container, Row } from "react-bootstrap";

import BuyerImage from "assets/images/buyer.jpg";
import EmployerImage from "assets/images/employer.jpg";
import JobSeekerImage from "assets/images/jobseeker.jpg";
import SellerImage from "assets/images/seller.jpg";
import { RoleCard } from "components";

import "./role.css";

const RoleSection = ({ logout }) => {
  const services = [
    {
      heading: "Buyer",
      description:
        "Responsible for purchasing goods for a company to use or sell in their own business",
      imgSrc: BuyerImage,
    },
    {
      heading: "Seller",
      description:
        "Individual or entity that offers any product, service, or financial asset for purchase.",
      imgSrc: SellerImage,
    },
    {
      heading: "Job Seeker",
      description:
        "Individual who is actively looking for an employment opportunity/job ",
      imgSrc: JobSeekerImage,
    },
    {
      heading: "Employer",
      description:
        "Organization in the government, private, nonprofit, or business sector that hires ",
      imgSrc: EmployerImage,
    },
  ];

  return (
    <>
      <section
        className="service_section_container"
        style={{ backgroundColor: "white" }}
      >
        <Container className="d-flex flex-column align-items-center">
          {/* <p className="subHeading">If you want to Change Your Role</p> */}
          <h1 className="heading mt-2 mb-3">If you want to Change Your Role</h1>
          {/* <GreenUnderline /> */}
          <Row className="mt-3 gy-5">
            {services.map((service, index) => (
              <RoleCard key={index} {...service} logout={logout} />
            ))}
          </Row>
        </Container>
      </section>
      ;{" "}
    </>
  );
};

export default RoleSection;
