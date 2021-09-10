import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export default function ScrollToTop() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleEvent);
    return () => {
      window.removeEventListener('scroll', handleEvent);
    };
  }, []);

  const handleEvent = () => {
    if (window.scrollY > 200) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      className={showBtn ? 'scroll__top-btn' : 'scroll__top-btn hidden'}
      onClick={scrollTop}
    >
      <IoIosArrowDown />
    </button>
  );
}
