import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

// Services
import * as authService from '../../services/authService';
import { currentUser } from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConf: '',
  });

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

      if (user.role === 'company') {
        navigate('/company/dashboard');
      } else {
        navigate('/jobs');
      }

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
          {message && <p className='text-danger'>{message}</p>}

          <form onSubmit={handleSubmit}>

            <h5 className='text-center mb-3'>Choose Your Role</h5>

            <div className='d-flex gap-3 mb-4'>
              <button
                type='button'
                className={`btn w-50 ${role === 'applicant' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFormData({ ...formData, role: 'applicant' })}
              >
                <i className='bi bi-person-fill me-1'></i> Applicant
              </button>

              <button
                type='button'
                className={`btn w-50 ${role === 'company' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFormData({ ...formData, role: 'company' })}
              >
                <i className='bi bi-building me-1'></i> Company
              </button>
            </div>

            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>{role === 'company' ? 'Company Name:' : 'Name:'}</label>
              <input type='text' className='form-control' id='name' name='name' value={name} onChange={handleChange} required />
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input type='email' className='form-control' id='email' name='email' value={email} onChange={handleChange} required />
            </div>

            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>Phone:</label>
              <input type='tel' className='form-control' id='phone' name='phone' value={phone} onChange={handleChange} required />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password:</label>
              <input type='password' className='form-control' id='password' name='password' value={password} onChange={handleChange} required />
            </div>

            <div className='mb-3'>
              <label htmlFor='confirm' className='form-label'>Confirm Password:</label>
              <input type='password' className='form-control' id='confirm' name='passwordConf' value={passwordConf} onChange={handleChange} required />
            </div>

            <button className='btn btn-primary w-100' disabled={isFormInvalid()}>Sign Up</button>

          </form>

          <p className='text-center mt-3'>
            Already have an account? <a href='/sign-in'>Sign In</a>
          </p>

        </div>
      </div>

    </main>
  );
};

export default SignUpForm;