import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { getJobs } from '../../services/jobService';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <main className="container py-5">
      <h1>Browse Jobs</h1>
      <p>Find available jobs and internships.</p>

      {loading ? (
        <p>Loading jobs...</p>
      ) : message ? (
        <p className="text-danger">{message}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="card p-3 mb-3">
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.job_type}</p>
            <p>{job.status}</p>

            <Link to={`/jobs/${job.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        ))
      )}
    </main>
  );
};

export default Jobs;