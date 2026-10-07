import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import {
  getJobApplications,
  updateApplicationStatus
} from '../../services/applicationService';

import Cards from '../Cards/Cards';

const JobApplications = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getJobApplications(jobId);
        setApplications(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const updatedApplication = await updateApplicationStatus(
        applicationId,
        status
      );

      setApplications(
        applications.map(application =>
          application.id === applicationId
            ? updatedApplication
            : application
        )
      );

      setMessage('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="container-fluid p-4 min-vh-100">

      <div className="col-md-10 col-lg-8 mx-auto">

        <div className="mb-4">
          <h2 className="fw-bold">Job Applications</h2>
          <p className="text-muted">View applicants for this job.</p>
        </div>

        {loading ? (
          <p>Loading applications...</p>
        ) : message ? (
          <p className="text-danger">{message}</p>
        ) : applications.length === 0 ? (
          <p>No applications for this job yet.</p>
        ) : (
          applications.map(application => (
            <Cards
              key={application.id}
              type="jobApplication"
              application={application}
              onStatusChange={handleStatusChange}
            />
          ))
        )}

      </div>

    </main>
  );
};

export default JobApplications;