import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';
import { getJobs, createJob, updateJob, deleteJob } from '../../services/jobService';
import Cards from '../Cards/Cards';

const ManageJobs = () => {
  const { user } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    job_type: '',
    status: ''
  });

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

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const handleCreate = () => {
    setEditingJob(null);

    setFormData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      job_type: '',
      status: ''
    });

    setShowForm(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);

    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      location: job.location,
      job_type: job.job_type,
      status: job.status
    });

    setShowForm(true);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (editingJob) {
        const updatedJob = await updateJob(editingJob.id, formData);

        setJobs(
          jobs.map(job =>
            job.id === editingJob.id ? updatedJob : job
          )
        );
      } else {
        const newJobData = {
          title: formData.title,
          description: formData.description,
          requirements: formData.requirements,
          location: formData.location,
          job_type: formData.job_type
        };

        const newJob = await createJob(newJobData);
        setJobs([...jobs, newJob]);
      }

      setShowForm(false);
      setEditingJob(null);
      setMessage('');

    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="container-fluid p-4 min-vh-100">

      <div className="col-md-10 col-lg-8 mx-auto">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold">Manage Jobs</h2>
            <p className="text-muted">Manage your job postings.</p>
          </div>

          <button className="btn btn-primary" onClick={handleCreate}>
            <i className="bi bi-plus-lg me-2"></i>
            Create Job
          </button>

        </div>

        {message && <p className="text-danger">{message}</p>}

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>You haven't created any jobs yet.</p>
        ) : (
          jobs.map(job => (
            <Cards
              key={job.id}
              type="manageJob"
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}

      </div>

      {showForm && (
        <>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">{editingJob ? 'Edit Job' : 'Create Job'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="modal-body">

                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Requirements</label>
                      <textarea className="form-control" name="requirements" value={formData.requirements} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Location</label>
                      <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Job Type</label>
                      <input type="text" className="form-control" name="job_type" value={formData.job_type} onChange={handleChange} required />
                    </div>

                    {editingJob && (
                      <div className="mb-3">
                        <label className="form-label">Status</label>

                        <select className="form-select" name="status" value={formData.status} onChange={handleChange} required>
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    )}

                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingJob ? 'Save Changes' : 'Create Job'}</button>
                  </div>

                </form>

              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

    </main>
  );
};

export default ManageJobs;