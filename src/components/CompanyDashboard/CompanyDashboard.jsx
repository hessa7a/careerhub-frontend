import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getJobs } from '../../services/jobService';
import { getCompanyApplications } from '../../services/applicationService';

const CompanyDashboard = () => {
  const { user } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const jobsData = await getJobs();
        const applicationsData = await getCompanyApplications();

        const companyJobs = jobsData.filter(
          job => job.company_id === user.id
        );

        setJobs(companyJobs);
        setApplications(applicationsData);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const activeJobs = jobs.filter(
    job => job.status === 'active'
  ).length;

  return (
    <main className="container-fluid p-4 min-vh-100">

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold">Company Dashboard</h2>
          <p className="text-muted">Welcome back, {user?.name}!</p>
        </div>
      </div>

      <div className="col-md-10 col-lg-8 mx-auto">

        <div className="row g-3 my-4">

          <div className="col-md-4">
            <div className="card border-0 p-3 h-100 bg-primary-subtle">
              <h2 className="text-primary">{jobs.length}</h2>
              <p className="mb-0">Total Jobs</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 p-3 h-100 bg-success-subtle">
              <h2 className="text-success">{activeJobs}</h2>
              <p className="mb-0">Active Jobs</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 p-3 h-100 bg-warning-subtle">
              <h2 className="text-warning">{applications.length}</h2>
              <p className="mb-0">Applications</p>
            </div>
          </div>

        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Recent Jobs</h5>
          <Link to="/company/jobs" className="text-decoration-none">View All</Link>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : message ? (
          <p className="text-danger">{message}</p>
        ) : jobs.length === 0 ? (
          <p>You haven't created any jobs yet.</p>
        ) : (
          jobs.slice(0, 3).map(job => (
            <div key={job.id} className="card shadow-sm border border-secondary-subtle mb-3">
              <div className="card-body p-4 d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="fw-bold mb-1">{job.title}</h5>
                  <p className="text-muted mb-1"><i className="bi bi-geo-alt me-1"></i>{job.location}</p>

                  <span
                    className={`badge text-capitalize ${
                      job.status === 'closed'
                        ? 'bg-danger-subtle text-danger'
                        : 'bg-success-subtle text-success'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary">View Job</Link>

              </div>
            </div>
          ))
        )}

      </div>

    </main>
  );
};

export default CompanyDashboard;