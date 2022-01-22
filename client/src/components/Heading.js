import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, Container } from "reactstrap";
const Heading = () => {
  const [getUser, setGetUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setGetUser(userInfo.user);
      console.log(userInfo.user);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Welcome!&nbsp; {getUser.name}</NavbarBrand>
        <Nav>
          <Link
            to={`/edit/${getUser._id}`}
            color="warning"
            className="btn btn-warning mr-5"
          >
            Edit Name
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Heading;
