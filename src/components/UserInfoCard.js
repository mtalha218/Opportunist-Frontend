import React from "react";

const UserInfoCard = ({ image, fullName }) => {
  return (
    <div className="d-flex flex-row w-100 align-items-center gap-2 rounded p-1 mx-0">
      <div
        id="avatar"
        className="flex-column"
        style={{ width: "40px", height: "40px" }}
      >
        <img src={image} alt="Avatar"></img>
      </div>
      <div
        id="content-section"
        className="d-flex flex-column justify-content-center"
      >
        <p
          style={{
            fontSize: "12px",
            padding: 0,
            margin: 0,
            lineHeight: "1rem",
          }}
        >
          {fullName}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
