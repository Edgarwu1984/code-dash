import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

const Modal = ({ children, show, onClose }) => {
  const closeModalHandle = e => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={show ? 'modal__component' : 'modal__component hide-modal'}>
      <div className='modal__overlay' />
      <div className='modal'>
        <header className='modal__header'>
          <button className='close-btn' onClick={closeModalHandle}>
            <MdClose />
          </button>
        </header>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
