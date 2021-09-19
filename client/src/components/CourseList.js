import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import CourseCard from './cards/CourseCard';
import CardListSkeleton from './skeleton/CardListSkeleton';
import AlertMessage from './common/AlertMessage';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourseList,
  getInstructorCourseList,
  getTopCourses,
} from '../redux/actions/courseActions';

const CourseList = ({
  category,
  isTopCourses,
  isInstructorCourses,
  instructorId,
}) => {
  // REDUX
  const dispatch = useDispatch();
  const courseList = useSelector(state =>
    isInstructorCourses
      ? state.instructorCourseList
      : isTopCourses
      ? state.topCourseList
      : state.courseList
  );
  const { loading, error, courses } = courseList;

  useEffect(() => {
    if (isInstructorCourses) {
      dispatch(getInstructorCourseList(instructorId));
    } else if (isTopCourses) {
      dispatch(getTopCourses());
    } else {
      dispatch(getCourseList());
    }
  }, [dispatch, instructorId, isInstructorCourses, isTopCourses]);

  const coursesList =
    isInstructorCourses || isTopCourses
      ? courses
      : courses.filter(c => c.category === category);

  return (
    <>
      {loading ? (
        <CardListSkeleton />
      ) : error ? (
        <AlertMessage message={error} type='danger' />
      ) : (
        <div className='grid col-4'>
          {coursesList.map(course => (
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

CourseList.propTypes = {
  category: PropTypes.string.isRequired,
  instructorId: PropTypes.string,
  isInstructorCourses: PropTypes.bool,
  isTopCourses: PropTypes.bool,
};

CourseList.defaultProps = {
  category: 'web-dev',
  isInstructorCourses: false,
  isTopCourses: false,
};

export default CourseList;
