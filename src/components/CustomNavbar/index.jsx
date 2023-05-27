import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export const CustomNavbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsUserLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    navigate(0);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="d-flex">
          <Navbar.Brand href="/">JobFinder</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/job-list">Job List</Nav.Link>
              <Nav.Link href="/applied-jobs">Applied Jobs</Nav.Link>
            </Nav>
            {isUserLoggedIn && (
              <Nav>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            )
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
