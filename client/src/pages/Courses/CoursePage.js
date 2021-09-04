import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// COMPONENTS
import Layout from '../../components/layout';
import Hero from '../../components/layout/Hero';
import Loader from '../../components/Loader';
import AlertMessage from '../../components/AlertMessage';
import Rating from '../../components/Rating';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails } from '../../redux/actions/courseActions';
import SectionTitle from '../../components/SectionTitle';

function CoursePage({ match }) {
  const id = match.params.id;
  const category = match.params.category;
  const courseName = match.params.name;

  const dispatch = useDispatch();
  const courseDetails = useSelector(state => state.courseDetails);
  const { loading, error, course } = courseDetails;

  useEffect(() => {
    dispatch(getCourseDetails(category, id));
  }, [dispatch, category, id]);

  if (loading) {
    return (
      <div className='full__screen-message'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='full__screen-message'>
        <AlertMessage message={error} type='danger' />
      </div>
    );
  }

  const {
    name,
    description,
    image,
    rating,
    numReviews,
    duration,
    instructor,
    features,
    language,
    reviews,
    updatedAt,
  } = course;

  return (
    <Layout pageTitle={`- ${courseName}`}>
      {course && (
        <>
          <Hero heroBg={image}>
            <div className='hero__content course__page-header'>
              <div className='breadcrumb'>
                <Link to='/courses'>courses</Link> /{' '}
                <Link to={`/courses/${category}`}>{category}</Link> /{' '}
                <span>{courseName}</span>
              </div>
              <div className='course'>
                <h2 className='course__name'>{name}</h2>
                <p className='course__description'>{description}</p>
                <Rating rating={rating} reviews={numReviews} />
                <div className='course__instructor'>
                  Created By:{' '}
                  <span>
                    {instructor && instructor.firstName}{' '}
                    {instructor && instructor.lastName}
                  </span>
                </div>

                <div className='course__info'>
                  <div className='update__date'>
                    Last Updated:
                    <span>{updatedAt && updatedAt.slice(0, 10)}</span>
                  </div>
                  <div className='language'>
                    Language: <span>{language}</span>
                  </div>
                  <div className='duration'>
                    Total Time: <span>{duration}</span>
                  </div>
                </div>
              </div>
              <div className='review__btn'>
                <button className='btn btn-primary'>Review</button>
              </div>
            </div>
          </Hero>
          <div className='course__features'>
            <div className='container'>
              <h3>What You Will Learn</h3>
              <div className='grid col-2 feature__list'>
                {features &&
                  features.map((f, index) => <li key={index}>{f}</li>)}
              </div>
            </div>
          </div>
          <div className='container'>
            <section className='content__section'>
              <SectionTitle title='course contents' />
            </section>
            <section className='review__section'>
              <SectionTitle title='latest reviews' />
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}

export default CoursePage;
