import axios from 'axios';
import {
  GET_INSTRUCTOR_LIST_REQUEST,
  GET_INSTRUCTOR_LIST_SUCCESS,
  GET_INSTRUCTOR_LIST_FAIL,
  GET_INSTRUCTOR_DETAILS_REQUEST,
  GET_INSTRUCTOR_DETAILS_SUCCESS,
  GET_INSTRUCTOR_DETAILS_FAIL,
} from '../constants/instructorConstants';

export const getInstructorList = () => async dispatch => {
  try {
    dispatch({ type: GET_INSTRUCTOR_LIST_REQUEST });
    const { data } = await axios.get('/api/instructors');
    dispatch({ type: GET_INSTRUCTOR_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_INSTRUCTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const getInstructorDetails = id => async dispatch => {
  try {
    dispatch({ type: GET_INSTRUCTOR_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/instructors/${id}`);
    dispatch({ type: GET_INSTRUCTOR_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_INSTRUCTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};
