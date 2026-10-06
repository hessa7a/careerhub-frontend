import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import { getJobs } from '../../services/jobService';

const CompanyDashboard = () => {
  const { user } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();

        const companyJobs = data.filter(
          job => job.company_id === user.id
        );

        setJobs(companyJobs);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const activeJobs = jobs.filter(
    job => job.status === 'active'
  ).length;

  return (
    <main className="container-fluid p-4 bg-light min-vh-100">

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold">Company Dashboard</h2>
          <p className="text-muted">Welcome back, {user?.name}!</p>
        </div>

        <Link to="/company/jobs/new" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Create Job
        </Link>
      </div>

      {/* Statistics */}
      <div className="row g-3 my-4">

        <div className="col-md-4">
          <div className="card border-0 p-4 h-100 bg-primary-subtle">
            <h2 className="text-primary">{jobs.length}</h2>
            <p className="mb-0">Total Jobs</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 p-4 h-100 bg-success-subtle">
            <h2 className="text-success">{activeJobs}</h2>
            <p className="mb-0">Active Jobs</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 p-4 h-100 bg-warning-subtle">
            <h2 className="text-warning">0</h2>
            <p className="mb-0">Applications</p>
          </div>
        </div>

      </div>

      {/* Recent Jobs */}
      <div className="card border-0 shadow-sm p-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Recent Jobs</h5>

          <Link to="/company/jobs" className="text-decoration-none">
            View All
          </Link>
        </div>

        {loading ? (
          <p>Loading jobs...</p>

        ) : message ? (
          <p className="text-danger">{message}</p>

        ) : jobs.length === 0 ? (
          <p>You haven't created any jobs yet.</p>

        ) : (
          jobs.slice(0, 3).map(job => (
            <div
              key={job.id}
              className="border rounded p-3 mb-2 bg-white"
            >
              <h5 className="mb-1">{job.title}</h5>
              <p className="text-muted mb-1">{job.location}</p>
              <small>{job.status}</small>
            </div>
          ))
        )}

      </div>

    </main>
  );
};

export default CompanyDashboard;