import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { JobPost } from "../../components/JobPost";
import { useNavigate } from "react-router-dom";
import { firebaseEndpoint, getFieldsOfDocument } from "../../utils/firebase";
import { formatDate } from "../../utils";

export const AppliedJobs = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("isLoggedIn");
  const [jobs, setJobs] = useState();
  const [appliedJobIds, setAppliedJobIds] = useState();

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

  const filteredJobs = jobs?.filter((job) =>
    appliedJobIds?.includes(job.name.split("/").slice(-1).pop())
  );

  const showJobs = jobs?.length > 0 || appliedJobIds?.length > 0;

  return (
    isUserLoggedIn && (
      <Container>
        <h3 className="my-3">Applied Jobs</h3>
        <Row xs={1} md={2} className="g-4 mx-2">
          {showJobs &&
            filteredJobs?.map((job, idx) => {
              const fields = getFieldsOfDocument(job);

              return (
                <Col key={idx}>
                  <JobPost
                    company={fields.company}
                    position={fields.position}
                    details={fields.details}
                    createDate={formatDate(job.createTime)}
                  />
                </Col>
              );
            })}
        </Row>
        {filteredJobs?.length === 0 && (
          <small className="d-flex m-5 justify-content-center">
            You have not yet submitted any job applications.
          </small>
        )}
      </Container>
    )
  );
};
