import { motion } from "framer-motion";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router";

import { switchRole } from "api/Users";

import { putRequest } from "services/apiClient";
import "../pages/User/Homepage/Role/role.css";
const RoleCard = ({ heading, description, imgSrc, logout }) => {
  const navigate = useNavigate();
  const handleRole = async (role) => {
    const bodyData = { role };
    const withJWT = true;
    try {
      const {
        data: {
          data: { role },
        },
      } = await putRequest(switchRole(), bodyData, withJWT);
      // console.log(role);
      localStorage.setItem("role", role);
      // console.log(props);
      logout();
      navigate("/auth/login");
    } catch (e) {}
  };
  return (
    <Col xs={12} sm={6} md={3}>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="service_card"
      >
        <motion.div
          className="service_img_container"
          onClick={() => handleRole(heading)}
        >
          <motion.img className="img" src={imgSrc} variants={imgVariants} />
        </motion.div>
        <div className="service_description_container">
          <h4>{heading}</h4>
          <div style={{ color: "black", textAlign: "left" }}>{description}</div>
        </div>
      </motion.div>
    </Col>
  );
};

//animation

const imgVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: 1,
      easing: "easeInOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 1,
      easing: "easeInOut",
    },
  },
};

export default RoleCard;
