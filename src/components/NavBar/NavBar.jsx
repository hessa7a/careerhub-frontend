
import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { removeToken } from '../../lib/helpers/jwt-helpers';

const NavBar = () => {

  const { user, setUser } = useContext(UserContext)

  const handleSignOut = ()=>{
    removeToken()
    setUser(null)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-briefcase-fill me-2"></i>
          CareerHub
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-3 align-items-center">

          { user
            ?
            <>
              <li className="nav-item">
                Hello {user.name}
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={user.role === 'company' ? '/company/dashboard' : '/applicant/dashboard'}
                >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleSignOut}>
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sign Out
                </Link>
              </li>
            </>
            :
            <>
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
            </>
          }

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
