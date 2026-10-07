import { useEffect, useState } from 'react';

import { getMyApplications } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';
import Cards from '../Cards/Cards';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getMyApplications();

        const applicationsWithJobs = await Promise.all(
          data.map(async (application) => {
            const job = await getJobById(application.job_post_id);

            return {
              ...application,
              job: job
            };
          })
        );

        setApplications(applicationsWithJobs);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <main className="container-fluid p-4 min-vh-100">

      <div className="col-md-10 col-lg-8 mx-auto">

        <div className="mb-4">
          <h2 className="fw-bold">My Applications</h2>
          <p className="text-muted">Track the jobs you applied for.</p>
        </div>

        {loading ? (
          <p>Loading applications...</p>
        ) : message ? (
          <p className="text-danger">{message}</p>
        ) : applications.length === 0 ? (
          <p>You haven't applied for any jobs yet.</p>
        ) : (
          applications.map(application => (
            <Cards
              key={application.id}
              type="myApplication"
              application={application}
            />
          ))
        )}

      </div>

    </main>
  );
};

export default MyApplications;