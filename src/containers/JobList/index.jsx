import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { JobPost } from "../../components/JobPost";
import { firebaseEndpoint, getFieldsOfDocument } from "../../utils/firebase";
import { formatDate } from "../../utils/index";
import { useNavigate } from "react-router-dom";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    firebaseEndpoint.get("/jobs").then((res) => setJobs(res?.data?.documents));
    firebaseEndpoint
      .get(`/users/${isUserLoggedIn}`)
      .then((res) =>
        setAppliedJobIds(
          JSON.parse(getFieldsOfDocument(res.data).applied_job_ids || "[]")
        )
      );
  }, [isUserLoggedIn]);

  const handleOnApply = (id) => {
    firebaseEndpoint
      .patch(`/users/${isUserLoggedIn}?updateMask.fieldPaths=applied_job_ids`, {
        fields: {
          applied_job_ids: {
            stringValue: JSON.stringify([...appliedJobIds, id]),
          },
        },
      })
      .then(() => {
        navigate(0);
      });
  };

  const filteredJobs = jobs?.filter(
    (job) => !appliedJobIds?.includes(job.name.split("/").slice(-1).pop())
  );

  const showJobs = jobs?.length > 0 || appliedJobIds?.length > 0;

  return (
    isUserLoggedIn && (
      <Container>
        <h3 className="my-3">Jobs List</h3>
        <Row xs={1} md={2} className="g-4 mx-2">
          {showJobs &&
            filteredJobs?.map((job, idx) => {
              const fields = getFieldsOfDocument(job);
              const jobId = job?.name?.split("/").slice(-1).pop();

              return (
                <Col key={idx}>
                  <JobPost
                    id={jobId}
                    company={fields.company}
                    position={fields.position}
                    details={fields.details}
                    createDate={formatDate(job.createTime)}
                    onApply={handleOnApply}
                  />
                </Col>
              );
            })}
        </Row>
        {filteredJobs?.length === 0 && (
          <small className="d-flex m-5 justify-content-center">
            Currently, there are no available job opportunities.
          </small>
        )}
      </Container>
    )
  );
};
