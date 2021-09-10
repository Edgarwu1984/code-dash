import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

function NotFoundPage({ history }) {
  // SET BACK TO HOME PAGE
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      history.push('/');
    }

    return () => {
      clearTimeout(time);
    };
  }, [history, time]);

  return (
    <div
      className='notfound-page'
      style={{ backgroundImage: "url('/images/bg5.jpg')" }}
    >
      <img className='triangle' src='/images/triangle.svg' alt='triangle' />
      <div className='notfound__info'>
        <h2 className='error__message'>
          <BiError />
          Oops.. Page Not Found.
        </h2>
        <div className='notfound__control'>
          <p className='countdown__message'>
            Back to Home page in <strong>{time}</strong> seconds...
          </p>
          <Link className='btn btn-outline-primary' to='/'>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
