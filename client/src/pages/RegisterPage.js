import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// COMPONENTS
import Loader from 'components/common/Loader';
// UTILITIES
import LoadTheme from 'utils/LoadTheme';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from 'redux/actions/userActions';

function RegisterPage({ history }) {
  LoadTheme();
  const getCurrentYear = new Date().getFullYear();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // REDUX
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
      toast.success('Welcome to CodeDash');
    } else if (error) {
      toast.error(error);
    }
  }, [dispatch, userInfo, error, history]);

  const submitHandler = e => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Input filed can not be empty.');
    } else if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(registerUser(username, email, password));
    }
  };

  return (
    <div className='login__page'>
      <div
        className='login__page-bg'
        style={{ backgroundImage: "url('/images/bg5.jpg')" }}
      >
        <img className='triangle' src='/images/triangle.svg' alt='triangle' />
      </div>
      <div className='login'>
        <div className='site-brand'>
          <span className='text'>CodeDash</span>
          <img className='logo' src='/images/logo.png' alt='logo' />
        </div>
        <div className='form__wrapper'>
          <h3 className='form-title'>Sign up</h3>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name' className='form-label'>
                Email
              </label>
              <input
                type='text'
                className='form-control'
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description' className='form-label'>
                Confirm Password
              </label>
              <input
                type='password'
                className='form-control'
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                className='btn btn-primary form-button'
                value='Sign up'
              />
              <Link
                to='/'
                type='submit'
                className='btn btn-outline-primary form-button'
              >
                Back
              </Link>
            </div>
            <div className='form-group'>
              Already have account?
              <Link className='form-link' to='/login'>
                Log in
              </Link>
            </div>
            <div className='site-copyright'>
              &copy; {getCurrentYear} CodeDash Academy
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
