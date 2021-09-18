import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
//COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';
// UTILITIES
import ResetPagePosition from '../../utils/ResetPagePosition';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails } from '../../redux/actions/courseActions';
import { updateCourse } from '../../redux/actions/adminActions';
import { getInstructorList } from '../../redux/actions/instructorActions';

function CourseEditPage({ history, match }) {
  // RESET PAGE POSITION
  const pathname = useLocation();
  ResetPagePosition(pathname);
  // REDUX
  const dispatch = useDispatch();

  // Get Instructors
  const instructorList = useSelector(state => state.instructorList);
  const { instructors } = instructorList;
  // Get Course Info
  const courseDetails = useSelector(state => state.courseDetails);
  const { loading: courseLoading, error: courseError, course } = courseDetails;
  const courseUpdate = useSelector(state => state.courseUpdate);
  const {
    loading: courseUpdateLoading,
    success: courseUpdateSuccess,
    error: courseUpdateError,
  } = courseUpdate;

  const [activeBtn, setActiveBtn] = useState(false);
  // COURSE FORM STATES
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [instructor, setInstructor] = useState({});

  // Update Button State Check
  useEffect(() => {
    if (!image || !name) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [image, name]);

  useEffect(() => {
    dispatch(getInstructorList());
    if (courseUpdateSuccess) {
      toast.success('Course updated.');
      history.push('/dashboard/courses');
    } else {
      if (
        course.category !== match.params.category ||
        course._id !== match.params.id
      ) {
        dispatch(getCourseDetails(match.params.category, match.params.id));
      } else {
        setName(course.name);
        setImage(course.image);
        setCategory(course.category);
        setCourseCategory(course.courseCategory);
        setDescription(course.description);
        setInstructor(course.instructor);
      }
    }
  }, [
    course._id,
    course.category,
    course.courseCategory,
    course.description,
    course.image,
    course.instructor,
    course.name,
    courseUpdateSuccess,
    dispatch,
    history,
    match,
  ]);

  const submitHandler = e => {
    e.preventDefault();
    if (!name || !image) {
      toast.error('Input field can not be empty.');
    } else {
      dispatch(
        updateCourse(course._id, {
          name,
          image,
          category,
          courseCategory,
          description,
          instructor,
        })
      );
    }
  };

  return (
    <Layout pageTitle='- Profile'>
      <Hero heroBg='/images/bg9.jpg'>
        <div className='hero__content'>
          <h1>{course.name}</h1>
        </div>
      </Hero>
      <div className='container'>
        <div className='page__nav'>
          <Link className='back-btn' to='/dashboard/courses'>
            {' '}
            {'<'} Back
          </Link>
        </div>
        <div className='course__form-wrap'>
          {courseLoading ? (
            <Loader />
          ) : courseError ? (
            <AlertMessage message={courseError} type='danger' />
          ) : (
            <form onSubmit={submitHandler}>
              {courseUpdateLoading && <Loader />}
              {courseUpdateError && (
                <AlertMessage message={courseUpdateError} type='danger' />
              )}
              <div className='form-group'>
                <div className='form-group__image course__image'>
                  <img src={image} alt='course_image' />
                </div>
                <label htmlFor='name' className='form-label'>
                  Image Url
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={image}
                  onChange={e => setImage(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  Course Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  Category
                </label>
                <select
                  className='form-control'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value='web-dev'>Web Development</option>
                  <option value='game-dev'>Game Development</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  Course Category
                </label>
                <select
                  className='form-control'
                  value={courseCategory}
                  onChange={e => setCourseCategory(e.target.value)}
                >
                  <option value='php'>PHP</option>
                  <option value='html'>HTML</option>
                  <option value='javascript'>JavaScript</option>
                  <option value='react'>React</option>
                  <option value='ue4'>Unreal Engine 4</option>
                  <option value='unity'>Unity</option>
                  <option value='zbrush'>Zbrush</option>
                  <option value='blender'>Blender</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  Instructor
                </label>
                <select
                  className='form-control'
                  onChange={e => setInstructor({ _id: e.target.value })}
                >
                  <option hidden value={instructor.fullName}>
                    {instructor.fullName}
                  </option>
                  {instructors.map(i => (
                    <option key={i._id} value={i._id}>
                      {i.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <textarea
                  rows={3}
                  type='text'
                  className='form-control'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className='form-group'>
                {activeBtn ? (
                  <input
                    type='submit'
                    className='btn btn-primary form-button'
                    value='Update'
                  />
                ) : (
                  <input
                    type='submit'
                    disabled
                    className='btn btn-primary form-button'
                    value='Update'
                  />
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CourseEditPage;
