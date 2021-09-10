import axios from 'axios';
import {
  GET_COURSE_LIST_REQUEST,
  GET_COURSE_LIST_SUCCESS,
  GET_COURSE_LIST_FAIL,
  GET_COURSE_DETAILS_REQUEST,
  GET_COURSE_DETAILS_SUCCESS,
  GET_COURSE_DETAILS_FAIL,
  GET_COURSE_CATEGORY_LIST_REQUEST,
  GET_COURSE_CATEGORY_LIST_SUCCESS,
  GET_COURSE_CATEGORY_LIST_FAIL,
  ADD_COURSE_REVIEW_REQUEST,
  ADD_COURSE_REVIEW_SUCCESS,
  ADD_COURSE_REVIEW_FAIL,
  ADD_COURSE_REVIEW_RESET,
  GET_INSTRUCTOR_COURSE_LIST_REQUEST,
  GET_INSTRUCTOR_COURSE_LIST_SUCCESS,
  GET_INSTRUCTOR_COURSE_LIST_FAIL,
  GET_TOP_COURSES_REQUEST,
  GET_TOP_COURSES_SUCCESS,
  GET_TOP_COURSES_FAIL,
  GET_TOP_COURSE_REVIEWS_REQUEST,
  GET_TOP_COURSE_REVIEWS_SUCCESS,
  GET_TOP_COURSE_REVIEWS_FAIL,
} from '../constants/courseConstants';

export const getCourseList = () => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_LIST_REQUEST });
    const { data } = await axios.get('/api/courses');
    dispatch({ type: GET_COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const getTopCourses = () => async dispatch => {
  try {
    dispatch({ type: GET_TOP_COURSES_REQUEST });
    const { data } = await axios.get('/api/courses/top');
    dispatch({ type: GET_TOP_COURSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TOP_COURSES_FAIL,
      payload: error.message,
    });
  }
};

export const getTopCourseReviews = () => async dispatch => {
  try {
    dispatch({ type: GET_TOP_COURSE_REVIEWS_REQUEST });
    const { data } = await axios.get('/api/courses/reviews/top');
    dispatch({ type: GET_TOP_COURSE_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TOP_COURSE_REVIEWS_FAIL,
      payload: error.message,
    });
  }
};

export const getCourseCategoryList = category => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`/api/courses/${category}`);
    dispatch({ type: GET_COURSE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const getInstructorCourseList = id => async dispatch => {
  try {
    dispatch({ type: GET_INSTRUCTOR_COURSE_LIST_REQUEST });
    const { data } = await axios.get(`/api/courses/instructors/${id}`);
    dispatch({ type: GET_INSTRUCTOR_COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INSTRUCTOR_COURSE_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const getCourseDetails = (category, id) => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/courses/${category}/${id}`);
    dispatch({ type: GET_COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const addCourseReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_COURSE_REVIEW_REQUEST });
    // ACCESS USERINFO IN ORDER TO GET USER TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/courses/${id}/reviews`, review, config);
    dispatch({ type: ADD_COURSE_REVIEW_SUCCESS });
    dispatch({ type: ADD_COURSE_REVIEW_RESET });
  } catch (error) {
    dispatch({
      type: ADD_COURSE_REVIEW_FAIL,
      payload: error.message,
    });
  }
};
