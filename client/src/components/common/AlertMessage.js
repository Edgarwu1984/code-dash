import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ message, type }) => {
  return (
    <div className={`alert ${type}`}>
      <h4>{message}</h4>
    </div>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default AlertMessage;
