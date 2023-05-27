import { useEffect, useState } from "react";
import { Container, Accordion } from "react-bootstrap";
import { UserDetailsForm } from "../../components/UserDetailsForm";
import { ConnectionsOverview } from "../../components/ConnectionsOverview";
import { JobExperienceList } from "../../components/JobExperienceList";
import { useNavigate } from "react-router-dom";
import { firebaseEndpoint, getFieldsOfDocument } from "../../utils/firebase";

export const UserProfile = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    firebaseEndpoint
      .get(`/users/${isUserLoggedIn}`)
      .then((res) => res.data)
      .then((data) =>
        setUserDetails({
          ...getFieldsOfDocument(data),
        })
      );
  }, [isUserLoggedIn]);

  return (
    isUserLoggedIn && (
      <Container>
        <Accordion
          className="m-2"
          defaultActiveKey={["0", "1", "2"]}
          alwaysOpen
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>User Details</Accordion.Header>
            <Accordion.Body>
              <UserDetailsForm userDetails={userDetails} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Experience</Accordion.Header>
            <Accordion.Body>
              <JobExperienceList userDetails={userDetails} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Connections</Accordion.Header>
            <Accordion.Body>
              <ConnectionsOverview />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    )
  );
};
