import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// COMPONENTS
import Loader from 'components/common/Loader';
// UTILITIES
import LoadTheme from 'utils/LoadTheme';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'redux/actions/userActions';

function LoginPage({ history }) {
  LoadTheme();

  const getCurrentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
      toast.success('Welcome to CodeDash');
    } else if (error) {
      toast.error(error);
    }
  }, [dispatch, userInfo, error, history]);

  // LOGIN FORM HANDLER
  const submitHandler = e => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Input filed can not be empty.');
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
          <span className='text'>CodeDash</span>
          <img className='logo' src='/images/logo.png' alt='logo' />
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
