import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import CourseCard from './cards/CourseCard';
import CardListSkeleton from './skeleton/CardListSkeleton';
import AlertMessage from './common/AlertMessage';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from '../redux/actions/courseActions';

const CourseCategoryList = ({ category }) => {
  // REDUX
  const dispatch = useDispatch();
  const courseList = useSelector(state => state.courseList);
  const { loading, error, courses } = courseList;

  useEffect(() => {
    dispatch(getCourseList());
  }, [dispatch]);

  const coursesList = courses && courses.filter(c => c.category === category);

  return (
    <>
      {loading ? (
        <CardListSkeleton />
      ) : error ? (
        <AlertMessage message={error} type='danger' />
      ) : (
        <div className='grid col-4'>
          {coursesList &&
            coursesList.map(course => (
              <CourseCard
                key={course._id}
                courseId={course._id}
                category={course.category}
                courseCategory={course.courseCategory}
                courseImg={course.image}
                courseName={course.name}
                courseTutorId={course.instructor?._id}
                courseTutorName={course.instructor?.fullName}
                courseDescription={course.description}
                courseRating={course.rating}
                numReviews={course.numReviews}
              />
            ))}
        </div>
      )}
    </>
  );
};

CourseCategoryList.propTypes = {
  category: PropTypes.string.isRequired,
};

CourseCategoryList.defaultProps = {
  category: 'web-dev',
};

export default CourseCategoryList;
