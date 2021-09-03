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
} from '../constants/courseConstants';

export const getCourseList = () => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_LIST_REQUEST });
    const { data } = await axios.get('/api/courses');
    dispatch({ type: GET_COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_LIST_FAIL,
      payload: error.response.data.message,
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
      payload: error.response.data.message,
    });
  }
};

export const getCourseDetails = id => async dispatch => {
  try {
    dispatch({ type: GET_COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/courses/${id}`);
    dispatch({ type: GET_COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
