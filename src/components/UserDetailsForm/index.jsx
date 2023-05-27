import { Button, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { firebaseEndpoint } from "../../utils/firebase";

export const UserDetailsForm = ({ userDetails }) => {
  const handleOnSave = (e) => {
    e.preventDefault();
    let requestBody;
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    Object.keys(formDataObj).forEach((key) => {
      requestBody = {
        ...requestBody,
        [key]: { stringValue: formDataObj[key] },
      };
    });

    firebaseEndpoint.patch(
      `/users/${userDetails.email}?updateMask.fieldPaths=name&updateMask.fieldPaths=surname&updateMask.fieldPaths=password&updateMask.fieldPaths=address`,
      {
        fields: {
          ...requestBody,
        },
      }
    );
  };

  return (
    <Form className="d-flex flex-column" onSubmit={handleOnSave}>
      <Row xs={1} md={2}>
        <Form.Group as={Col} controlId="formGridName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Name"
            name="name"
            minLength="0"
            required
            defaultValue={userDetails?.name}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSurname" className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            placeholder="Surname"
            autoComplete="off"
            minLength="0"
            required
            defaultValue={userDetails?.surname}
          />
        </Form.Group>
      </Row>

      <Row xs={1} md={2}>
        <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled
            type="email"
            placeholder="Enter email"
            defaultValue={userDetails?.email}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            minLength="4"
            maxLength="16"
            required
            placeholder="Password"
            defaultValue={userDetails?.password}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          name="address"
          placeholder="1234 Main St"
          minLength="0"
          defaultValue={userDetails?.address}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="align-self-end">
        Save
      </Button>
    </Form>
  );
};

UserDetailsForm.propTypes = { userDetails: PropTypes.object };
