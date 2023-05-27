import { useState, useEffect } from "react";
import { Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { firebaseEndpoint, getFieldsOfDocument } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const { email, password } = formDataObj;

    firebaseEndpoint
      .get(`/users/${email}`)
      .then((res) => {
        const fields = getFieldsOfDocument(res.data);

        if (fields.password === password) {
          localStorage.setItem("isLoggedIn", email);
          navigate("/");
          navigate(0);
        } else {
          setErrorMsg("Wrong Password");
        }
      })
      .catch(() => {
        setErrorMsg("E-Mail Not Found");
      });
  };

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn");

    if (isUserLoggedIn) {
      navigate("/");
      navigate(0);
    }
  }, [navigate]);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center "
        style={{ height: "100vh" }}
      >
        <Card>
          <Card.Body>
            <h5>Login</h5>
            <Form className="text-center" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingEmail"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    name="password"
                    type="password"
                    minLength={4}
                    maxLength={16}
                    required
                    placeholder="Password"
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
                  href="/register"
                  className="mx-1"
                >
                  Register
                </Button>

                <Button variant="primary" type="submit" className="mx-1">
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
