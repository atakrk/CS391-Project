import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { firebaseEndpoint } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

export const JobExperienceList = ({ userDetails }) => {
  const experiences = JSON.parse(userDetails?.experience || "[]");
  const navigate = useNavigate();

  const handleOnSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    firebaseEndpoint
      .patch(`/users/${userDetails.email}?updateMask.fieldPaths=experience`, {
        fields: {
          experience: {
            stringValue: JSON.stringify([...experiences, formDataObj]),
          },
        },
      })
      .then(() => {
        navigate(0);
      });
  };

  return (
    <div>
      <ListGroup as="ol" className="mb-3">
        {experiences?.map((experience, index) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={index}
          >
            <div className="ms-2 me-auto">
              <div>
                <b>{experience?.company}</b>{" "}
                <small>{experience?.position}</small>
              </div>
              {experience?.details}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleOnSave} className="d-flex flex-column">
        <Row xs={1} md={2}>
          <Form.Group as={Col} controlId="formGridCompany" className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control placeholder="Copmany" name="company" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPosition" className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control placeholder="Position" name="position" />
          </Form.Group>
        </Row>
        <Form.Group controlId="formGridPosition" className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control as="textarea" placeholder="Details" name="details" />
        </Form.Group>
        <Button variant="primary" type="submit" className="align-self-end">
          Add New
        </Button>
      </Form>
    </div>
  );
};

JobExperienceList.propTypes = { userDetails: PropTypes.object };
