import React from 'react';

export default function Loader() {
  return (
    <img
      src='/images/loader.svg'
      alt='loader'
      style={{
        filter:
          'invert(24%) sepia(98%) saturate(6906%) hue-rotate(244deg) brightness(92%) contrast(89%)',
      }}
    />
  );
}
