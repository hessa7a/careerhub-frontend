
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';
import { currentUser } from '../../services/userService';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await signIn(formData);
      const signedInUser = await currentUser();
      setUser(signedInUser);

      if (signedInUser.role === 'company') {
        navigate('/company/dashboard');
      } else {
        navigate('/applicant/dashboard');
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className='container py-5'>
      <div className='card shadow-sm mx-auto' style={{ maxWidth: '500px' }}>
        <div className='card-body p-4'>

          <h1 className='text-center mb-4'>Sign In</h1>
          <p className='text-danger'>{message}</p>

          <form autoComplete='off' onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input
                type='email'
                className='form-control'
                autoComplete='off'
                id='email'
                value={formData.email}
                name='email'
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password:</label>
              <input
                type='password'
                className='form-control'
                autoComplete='off'
                id='password'
                value={formData.password}
                name='password'
                onChange={handleChange}
                required
              />
            </div>

            {/* Form Actions */}
            <div className='d-grid gap-2'>
              <button type='submit' className='btn btn-primary'>
                <i className='bi bi-box-arrow-in-right'></i> Sign In
              </button>
              <button
                type='button'
                className='btn btn-outline-secondary'
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>

          <p className='text-center mt-3'>
            Don't have an account? <a href='/sign-up'>Sign Up</a>
          </p>

        </div>
      </div>
    </main>
  );
};

export default SignInForm;
