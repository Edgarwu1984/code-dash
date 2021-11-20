import React, { useEffect } from 'react';
// COMPONENTS
import CourseCard from './cards/CourseCard';
import CardListSkeleton from './skeleton/CardListSkeleton';
import AlertMessage from './common/AlertMessage';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getTopCourses } from '../redux/actions/courseActions';

const TopCourseList = () => {
  // REDUX
  const dispatch = useDispatch();
  const courseList = useSelector(state => state.topCourseList);

  const { loading, error, courses } = courseList;

  useEffect(() => {
    dispatch(getTopCourses());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <CardListSkeleton />
      ) : error ? (
        <AlertMessage message={error} type='danger' />
      ) : (
        <div className='grid col-4'>
          {courses &&
            courses.map(course => (
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

export default TopCourseList;
