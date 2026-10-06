import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getJobById } from '../../services/jobService';
import { createApplication } from '../../services/applicationService';

const JobDetails = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    message: '',
    resume: ''
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await getJobById(jobId);
        setJob(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await createApplication({
        job_post_id: Number(jobId),
        message: formData.message,
        resume: formData.resume
      });

      setSuccess('Application submitted successfully!');
      setMessage('');
      setShowForm(false);

      setFormData({
        message: '',
        resume: ''
      });
    } catch (err) {
      setMessage(err.message);
      setSuccess('');
    }
  };

  if (loading) {
    return <p className="p-4">Loading job...</p>;
  }

  return (
    <main className="container py-5">

      <h1>{job.title}</h1>
      <p>{job.location}</p>
      <p>{job.job_type}</p>

      <hr />

      <h4>Description</h4>
      <p>{job.description}</p>

      <h4>Requirements</h4>
      <p>{job.requirements}</p>

      <hr />

      {success && <p className="text-success">{success}</p>}
      {message && <p className="text-danger">{message}</p>}

      {!showForm && (
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Apply Now
        </button>
      )}

      {showForm && (
        <div className="card p-4 mt-4">

          <h4 className="mb-3">Apply for this Job</h4>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Message</label>

              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">CV</label>

              <input
                type="text"
                className="form-control"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Add your CV link"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Submit Application
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </form>

        </div>
      )}

    </main>
  );
};

export default JobDetails;