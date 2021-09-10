import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// COMPONENTS
import Loader from '../components/common/Loader';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

function LoginPage({ history, location }) {
  const getCurrentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // EMAIL FORMAT VALIDATOR
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  // REDIRECT DIRECTORY
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      toast.success('Welcome to CodeDash');
    } else if (error) {
      toast.error(error);
    }
  }, [dispatch, userInfo, redirect, error, history]);

  // LOGIN FORM HANDLER
  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Input filed can not be empty.');
    } else if (!emailFormat) {
      toast.error('Invalid email format.');
    } else {
      dispatch(loginUser(email, password));
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
          <img className='site-logo' src='/images/logo.png' alt='logo' />
        </div>
        <div className='form__wrapper'>
          <h3 className='form-title'>Login</h3>
          <form onSubmit={submitHandler}>
            {loading && <Loader />}
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
              <input
                type='submit'
                className='btn btn-primary form-button'
                value='Login'
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
              Don't have account?
              <Link className='form-link' to='/register'>
                Sign up
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

export default LoginPage;
