import { Link } from 'react-router';

const Landing = () => {
  return (
    <main className="container py-5">

      <div className="text-center py-5">

        <h1 className="fw-bold mb-3">
          Find Your Next Opportunity
        </h1>

        <p className="text-muted mb-4">
          Browse jobs and internships, apply to opportunities, and track your applications with CareerHub.
        </p>

        <div className="d-flex justify-content-center gap-3">

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