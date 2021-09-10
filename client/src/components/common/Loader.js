import React from 'react';

export default function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <img
        src='/images/loader.svg'
        alt='loader'
        style={{
          margin: 'auto',
          filter:
            'invert(24%) sepia(98%) saturate(6906%) hue-rotate(244deg) brightness(92%) contrast(89%)',
        }}
      />
    </div>
  );
}
