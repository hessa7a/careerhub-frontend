
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

// Services
import * as authService from '../../services/authService';
import { currentUser } from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';


const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConf: '',
  });
  const { setUser } = useContext(UserContext);

  const { role, name, email, phone, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const payload = { name, email, phone, password, role };
      await authService.signUp(payload);

      const user = await currentUser();

      setUser(user);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(role && name && email && phone && password && password === passwordConf);
  };

  return (
    <main className='container py-5'>
      <div className='card shadow-sm mx-auto' style={{ maxWidth: '500px' }}>
        <div className='card-body p-4'>

          <h1 className='text-center mb-4'>Sign Up</h1>
          <p className='text-danger'>{message}</p>

          {step === 1 ? (
            <div>
              {/* Role Selection */}
              <h5 className='text-center mb-4'>Choose Your Role</h5>

              <div className='d-flex gap-3 mb-3'>
                <button
                  type='button'
                  className={`btn w-50 ${role === 'applicant' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFormData({ ...formData, role: 'applicant' })}
                >
                  <i className='bi bi-person-fill'></i> Applicant
                </button>

                <button
                  type='button'
                  className={`btn w-50 ${role === 'company' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFormData({ ...formData, role: 'company' })}
                >
                  <i className='bi bi-building'></i> Company
                </button>
              </div>

              <button
                type='button'
                className='btn btn-primary w-100'
                disabled={!role}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Name Field */}
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  {role === 'company' ? 'Company Name:' : 'Name:'}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  value={name}
                  name='name'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email:</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  name='email'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className='mb-3'>
                <label htmlFor='phone' className='form-label'>Phone:</label>
                <input
                  type='tel'
                  className='form-control'
                  id='phone'
                  value={phone}
                  name='phone'
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
                  id='password'
                  value={password}
                  name='password'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Coinfirm Password */}
              <div className='mb-3'>
                <label htmlFor='confirm' className='form-label'>Confirm Password:</label>
                <input
                  type='password'
                  className='form-control'
                  id='confirm'
                  value={passwordConf}
                  name='passwordConf'
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Form Actions */}
              <div className='d-grid gap-2'>
                <button className='btn btn-primary' disabled={isFormInvalid()}>
                  Sign Up
                </button>

                <button
                  type='button'
                  className='btn btn-outline-secondary'
                  onClick={() => setStep(1)}
                >
                  <i className='bi bi-arrow-left'></i> Back
                </button>

                <button
                  type='button'
                  className='btn btn-link'
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <p className='text-center mt-3'>
            Already have an account? <a href='/sign-in'>Sign In</a>
          </p>

        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
