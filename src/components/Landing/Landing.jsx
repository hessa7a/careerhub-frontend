import { Link } from 'react-router';

const Landing = () => {
  return (
    <main
      className="container-fluid bg-white d-flex align-items-center justify-content-center"
      style={{ minHeight: 'calc(100vh - 70px)' }}
    >

      <div className="container text-center">

        <h1 className="fw-bold mb-3">
          Find Your Next Opportunity
        </h1>

        <p className="text-muted mb-4">
          Browse jobs and internships, apply to opportunities, and track your applications with CareerHub.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">

          <Link to="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>

          <Link to="/sign-up" className="btn btn-outline-primary">
            Sign Up
          </Link>

          <Link to="/sign-in" className="btn btn-outline-secondary">
            Sign In
          </Link>

        </div>

      </div>

    </main>
  );
};

export default Landing;