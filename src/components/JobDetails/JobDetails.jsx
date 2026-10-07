import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getJobById } from '../../services/jobService';
import { createApplication } from '../../services/applicationService';
import { UserContext } from '../../contexts/UserContext';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

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

  const handleApplyClick = () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    if (user.role !== 'applicant') {
      setMessage('Only applicants can apply for jobs');
      return;
    }

    setMessage('');
    setShowForm(true);
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
    <main className="container-fluid p-4 min-vh-100">

      <div className="col-md-8 col-lg-7 mx-auto">

        <div className="card shadow-sm border border-secondary-subtle">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-start mb-4">

              <div>
                <h2 className="fw-bold mb-2">{job.title}</h2>

                <p className="text-muted mb-2">
                  <i className="bi bi-geo-alt me-1"></i>
                  {job.location}
                </p>

                <span className="badge bg-primary-subtle text-primary me-2">
                  {job.job_type}
                </span>

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

              {user?.role !== 'company' && job.status === 'active' && (
                <button className="btn btn-primary" onClick={handleApplyClick}>
                  Apply Now
                </button>
              )}

            </div>

            <hr />

            <div className="my-4">
              <h4 className="fw-bold">Description</h4>
              <p>{job.description}</p>
            </div>

            <div className="mb-4">
              <h4 className="fw-bold">Requirements</h4>
              <p>{job.requirements}</p>
            </div>

            {success && <p className="text-success mb-0">{success}</p>}
            {message && <p className="text-danger mb-0">{message}</p>}

          </div>
        </div>

      </div>

      {showForm && user?.role === 'applicant' && (
        <>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Apply for {job.title}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="modal-body">

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

                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit Application</button>
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

export default JobDetails;