import axios from 'axios';
import { apiUrl } from 'config';
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
  GET_INSTRUCTOR_COURSE_LIST_REQUEST,
  GET_INSTRUCTOR_COURSE_LIST_SUCCESS,
  GET_INSTRUCTOR_COURSE_LIST_FAIL,
  GET_TOP_COURSES_REQUEST,
  GET_TOP_COURSES_SUCCESS,
  GET_TOP_COURSES_FAIL,
} from '../constants/courseConstants';

export const getCourseList = () => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_LIST_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/courses`);
    console.log(data);
    dispatch({ type: GET_COURSE_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const getTopCourses = () => async dispatch => {
  try {
    dispatch({ type: GET_TOP_COURSES_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/courses/top-4`);
    dispatch({ type: GET_TOP_COURSES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_TOP_COURSES_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const getCourseCategoryList = category => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`${apiUrl}//api/courses/${category}`);
    dispatch({ type: GET_COURSE_CATEGORY_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const getInstructorCourseList = id => async dispatch => {
  try {
    dispatch({ type: GET_INSTRUCTOR_COURSE_LIST_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/courses/instructors/${id}`);
    dispatch({ type: GET_INSTRUCTOR_COURSE_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_INSTRUCTOR_COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const getCourseDetails = (category, id) => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(`${apiUrl}/api/courses/${category}/${id}`);
    dispatch({ type: GET_COURSE_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};
