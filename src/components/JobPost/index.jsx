import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const JobPost = ({
  id,
  company,
  position,
  details,
  createDate,
  onApply,
}) => {
  return (
    <Card>
      <Card.Header>{company}</Card.Header>
      <Card.Body>
        <Card.Title>{position}</Card.Title>
        <Card.Text>{details}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
        <small className="text-muted">{createDate}</small>
        {onApply && (
          <Button variant="primary" onClick={() => onApply(id)}>
            Apply
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

JobPost.propTypes = {
  id: PropTypes.string,
  company: PropTypes.string,
  position: PropTypes.string,
  details: PropTypes.string,
  createDate: PropTypes.string,
  onApply: PropTypes.func,
};
