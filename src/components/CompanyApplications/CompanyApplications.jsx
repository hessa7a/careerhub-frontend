import { useEffect, useState } from 'react';

import { getCompanyApplications } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';
import Cards from '../Cards/Cards';

const CompanyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getCompanyApplications();

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
          <h2 className="fw-bold">Job Applications</h2>
          <p className="text-muted">View and manage candidates for your job postings.</p>
        </div>

        {loading ? (
          <p>Loading applications...</p>
        ) : message ? (
          <p className="text-danger">{message}</p>
        ) : applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          applications.map(application => (
            <Cards
              key={application.id}
              type="application"
              application={application}
            />
          ))
        )}

      </div>

    </main>
  );
};

export default CompanyApplications;