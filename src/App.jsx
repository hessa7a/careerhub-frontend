import './App.css';
import { useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router';

// Components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import CompanyDashboard from './components/CompanyDashboard/CompanyDashboard';
import Landing from './components/Landing/Landing';
import Jobs from './components/Jobs/Jobs';
import JobDetails from './components/JobDetails/JobDetails';
import MyApplications from './components/MyApplications/MyApplications';
import ManageJobs from './components/ManageJobs/ManageJobs';
import JobApplications from './components/JobApplications/JobApplications';
import CompanyApplications from './components/CompanyApplications/CompanyApplications';

// Context
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  const showSidebar = user || location.pathname.startsWith('/jobs');

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className={showSidebar ? 'd-flex' : ''}>
      <NavBar />

      <div className="flex-grow-1">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/jobs/:jobId' element={<JobDetails />} />
          <Route path='/applicant/applications' element={user?.role === 'applicant' ? <MyApplications /> : <Navigate to={user ? '/' : '/sign-in'} replace />} />
          <Route path='/company/dashboard' element={user?.role === 'company' ? <CompanyDashboard /> : <Navigate to={user ? '/' : '/sign-in'} replace />} />
          <Route path='/company/jobs' element={user?.role === 'company' ? <ManageJobs /> : <Navigate to={user ? '/' : '/sign-in'} replace />} />
          <Route path='/company/jobs/:jobId/applications' element={user?.role === 'company' ? <JobApplications /> : <Navigate to={user ? '/' : '/sign-in'} replace />} />
          <Route path='/company/applications' element={user?.role === 'company' ? <CompanyApplications /> : <Navigate to={user ? '/' : '/sign-in'} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;