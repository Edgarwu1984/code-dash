import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from 'react-icons/io';

const Accordion = ({ data }) => {
  const [clickedIndex, setClickedIndex] = useState(0);

  const accordionHandler = index => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };
  return (
    <div className='accordion__container'>
      {data &&
        data.map((el, index) => (
          <div
            className='accordion'
            key={index}
            onClick={() => accordionHandler(index)}
          >
            <label
              className={
                clickedIndex === index
                  ? 'accordion__label accordion__active'
                  : 'accordion__label'
              }
              htmlFor={index}
            >
              <span className='accordion__label-text'>
                <strong>{index + 1}.</strong> {el.contentListName}
              </span>
              <IoIosArrowDown className='accordion__label-icon' />
            </label>
            <div
              className={
                clickedIndex === index
                  ? 'accordion__content accordion__expanded'
                  : 'accordion__content '
              }
            >
              {el.contentList &&
                el.contentList.map((i, index) => (
                  <li className='accordion__content-list' key={index}>
                    {i}
                  </li>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

Accordion.defaultProps = {
  data: [
    {
      label: 'Accordion 1',
      content:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ',
    },
    {
      label: 'Accordion 2',
      content:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ',
    },
  ],
};

Accordion.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Accordion;
