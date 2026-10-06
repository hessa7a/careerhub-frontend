import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import CompanyDashboard from './components/CompanyDashboard/CompanyDashboard';
import Landing from './components/Landing/Landing';
import Jobs from './components/Jobs/Jobs';
import JobDetails from './components/JobDetails/JobDetails';

// Context
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className={user ? 'd-flex' : ''}>
      <NavBar />

      <div className="flex-grow-1">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/jobs' element={<Jobs />} />

          <Route
            path='/company/dashboard'
            element={
              user?.role === 'company'
                ? <CompanyDashboard />
                : <Navigate to={user ? '/' : '/sign-in'} replace />
            }
          />

          <Route path='/jobs/:jobId' element={<JobDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;