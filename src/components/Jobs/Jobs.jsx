import { useEffect, useState } from 'react';

import { getJobs } from '../../services/jobService';
import Cards from '../Cards/Cards';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const jobType = job.job_type.toLowerCase();

    const matchesFilter =
      filter === 'all' ||
      (filter === 'jobs' && !jobType.includes('intern')) ||
      (filter === 'internships' && jobType.includes('intern'));

    return matchesSearch && matchesFilter && job.status === 'active';
  });

  return (
    <main className="container-fluid p-4 min-vh-100">

      <div className="col-md-10 col-lg-8 mx-auto">

        <div className="mb-4">
          <h2 className="fw-bold">Job & Internship Positions</h2>
          <p className="text-muted">Find the right opportunity for you.</p>
        </div>

        <div className="mb-4" style={{ maxWidth: '500px' }}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by title or location..."
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
        </div>

        <div className="d-flex gap-2 mb-4">
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter === 'jobs' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter('jobs')}>Jobs</button>
          <button className={`btn ${filter === 'internships' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setFilter('internships')}>Internships</button>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : message ? (
          <p className="text-danger">{message}</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map(job => (
            <Cards key={job.id} type="job" job={job} />
          ))
        )}

      </div>

    </main>
  );
};

export default Jobs;