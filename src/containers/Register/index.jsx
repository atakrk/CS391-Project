import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { firebaseEndpoint } from "../../utils/firebase";

export const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");

    if (isUserLoggedIn) {
      navigate("/");
      navigate(0);
    }
  }, [navigate]);

  useEffect(() => {
    firebaseEndpoint
      .get(`/users/`)
      .then((res) =>
        setUsers(
          res.data.documents.map((data) => data.name.split("/").slice(-1).pop())
        )
      );
  }, []);

  const handleSubmit = (e) => {
    setErrorMsg("E-Mail Already In Use");

    e.preventDefault();
    let requestBody;
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const { email } = formDataObj;

    if (users.includes(email)) {
      setErrorMsg("E-Mail Already In Use");
      return;
    }

    Object.keys(formDataObj).forEach((key) => {
      requestBody = {
        ...requestBody,
        [key]: { stringValue: formDataObj[key] },
      };
    });

    firebaseEndpoint
      .patch(`/users/${email}`, {
        fields: {
          ...requestBody,
          surname: { stringValue: "" },
          address: { stringValue: "" },
          applied_job_ids: { stringValue: "[]" },
          experience: { stringValue: "[]" },
        },
      })
      .then(() => {
        setErrorMsg("");
        localStorage.setItem("isLoggedIn", email);
        navigate("/");
        navigate(0);
      });
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center "
      style={{ height: "100vh" }}
    >
      <Card>
        <Card.Body>
          <h5>Register</h5>
          <Form className="text-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel
                controlId="floatingName"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  placeholder="Name"
                  name="name"
                  required
                  minLength={0}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  name="email"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  minLength={4}
                  maxLength={16}
                  required
                  name="password"
                />
              </FloatingLabel>
              {errorMsg && (
                <small className="text-danger my-2">Error: {errorMsg}</small>
              )}
            </Form.Group>

            <div>
              <Button
                variant="secondary"
                type="button"
                href="/login"
                className="mx-1"
              >
                Login
              </Button>

              <Button variant="primary" type="submit" className="mx-1">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
