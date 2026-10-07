import { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';

const NavBar = () => {

  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const showSidebar = user || location.pathname.startsWith('/jobs');

  const handleSignOut = () => {
    removeToken();
    setUser(null);
  };

  if (showSidebar) {
    return (
      <aside
        className="bg-white border-end min-vh-100 p-3 d-flex flex-column"
        style={{ width: '220px' }}
      >

        <Link className="navbar-brand fw-bold text-primary d-block mb-4" to="/">
          <i className="bi bi-briefcase-fill me-2"></i>
          CareerHub
        </Link>

        {user && (
          <p className="mb-4">Hello {user.name}</p>
        )}

        <nav className="nav flex-column gap-2">

          {!user && (
            <>
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-2"></i>
                Home
              </Link>

              <Link className="nav-link" to="/jobs">
                <i className="bi bi-search me-2"></i>
                Browse Jobs
              </Link>

              <Link className="nav-link" to="/sign-in">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </Link>

              <Link className="nav-link" to="/sign-up">
                <i className="bi bi-person-plus me-2"></i>
                Sign Up
              </Link>
            </>
          )}

          {user?.role === 'applicant' && (
            <>
              <Link className="nav-link" to="/jobs">
                <i className="bi bi-search me-2"></i>
                Browse Jobs
              </Link>

              <Link className="nav-link" to="/applicant/applications">
                <i className="bi bi-file-earmark-text me-2"></i>
                My Applications
              </Link>
            </>
          )}

          {user?.role === 'company' && (
            <>
              <Link className="nav-link" to="/company/dashboard">
                <i className="bi bi-house-door me-2"></i>
                Dashboard
              </Link>

              <Link className="nav-link" to="/company/jobs">
                <i className="bi bi-briefcase me-2"></i>
                Manage Jobs
              </Link>

              <Link className="nav-link" to="/company/applications">
                <i className="bi bi-people me-2"></i>
                Applications
              </Link>
            </>
          )}

        </nav>

        {user && (
          <Link
            className="nav-link text-danger mt-auto"
            to="/"
            onClick={handleSignOut}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Sign Out
          </Link>
        )}

      </aside>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-briefcase-fill me-2"></i>
          CareerHub
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-3 align-items-center">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/jobs">Jobs</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/sign-in">Sign In</Link>
          </li>

          <li className="nav-item">
            <Link className="btn btn-primary" to="/sign-up">
              Sign Up
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
};

export default NavBar;