import { Row, Col, Card, Image } from "react-bootstrap";

export const ConnectionsOverview = () => {
  return (
    <Row xs="auto">
      <Col>
        <Card>
          <Card.Body>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              height="80"
              width="80"
              rounded
            />
          </Card.Body>
          <Card.Footer>Jack Doe</Card.Footer>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=female"
              height="80"
              width="80"
              rounded
            />
          </Card.Body>
          <Card.Footer>Jane Doe</Card.Footer>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              height="80"
              width="80"
              rounded
            />
          </Card.Body>
          <Card.Footer>John Doe</Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
