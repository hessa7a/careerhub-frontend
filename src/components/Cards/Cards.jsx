import { Link } from 'react-router';

const Cards = ({
  type,
  job,
  application,
  onEdit,
  onDelete,
  onStatusChange
}) => {

  return (
    <div className="card shadow-sm border border-secondary-subtle mb-3">
      <div className="card-body p-4">

        {type === 'job' && (
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5 className="fw-bold mb-1">{job.title}</h5>
              <p className="text-muted mb-1"><i className="bi bi-geo-alt me-1"></i>{job.location}</p>
            </div>

            <div className="text-end">
              <span className="badge bg-success-subtle text-success mb-2">{job.job_type}</span>
              <div>
                <Link to={`/jobs/${job.id}`} className="btn btn-outline-primary">View Details</Link>
              </div>
            </div>

          </div>
        )}

        {type === 'application' && (
          <div className="row align-items-center">

            <div className="col-md-6">
              <h5 className="fw-bold mb-1">{application.applicant?.name}</h5>
              <p className="mb-1">{application.job?.title}</p>
              <small className="text-muted">Applied on {new Date(application.applied_date).toLocaleDateString()}</small>
            </div>

            <div className="col-md-3">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 text-capitalize">{application.status}</span>
            </div>

            <div className="col-md-3 text-end">
              <Link to={`/company/jobs/${application.job_post_id}/applications`} className="btn btn-outline-primary">View</Link>
            </div>

          </div>
        )}

        {type === 'myApplication' && (
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5 className="fw-bold mb-1">{application.job?.title}</h5>
              <p className="text-muted mb-1"><i className="bi bi-geo-alt me-1"></i>{application.job?.location}</p>
              <small className="text-muted">Applied on {new Date(application.applied_date).toLocaleDateString()}</small>
            </div>

            <div className="text-end">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 text-capitalize">{application.status}</span>
            </div>

          </div>
        )}

        {type === 'manageJob' && (
          <div className="d-flex justify-content-between align-items-start">

            <div>
              <h5 className="fw-bold mb-1">{job.title}</h5>
              <p className="text-muted mb-1"><i className="bi bi-geo-alt me-1"></i>{job.location}</p>
              <p className="mb-1">{job.job_type}</p>

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

            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary" onClick={() => onEdit(job)}>Edit</button>
              <Link to={`/company/jobs/${job.id}/applications`} className="btn btn-outline-secondary">View Applications</Link>
              <button className="btn btn-outline-danger" onClick={() => onDelete(job.id)}>Delete</button>
            </div>

          </div>
        )}

        {type === 'jobApplication' && (
          <div>

            <h5 className="fw-bold mb-3">{application.applicant?.name}</h5>

            <p className="mb-1">
              <strong>Email:</strong> {application.applicant?.email}
            </p>

            <p className="mb-1">
              <strong>Phone:</strong> {application.applicant?.phone}
            </p>

            <p className="mb-1">
              <strong>Message:</strong> {application.message || 'No message provided'}
            </p>

            <p className="mb-3">
              <strong>CV:</strong> {application.resume || 'No CV provided'}
            </p>

            <label className="form-label">Status</label>

            <select
              className="form-select"
              value={application.status}
              onChange={(evt) => onStatusChange(application.id, evt.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="reviewed">Reviewed</option>
              <option value="interview">Interview</option>
              <option value="got the job">Got the Job</option>
            </select>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cards;