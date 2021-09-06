import axios from 'axios';
import {
  GET_INSTRUCTOR_LIST_REQUEST,
  GET_INSTRUCTOR_LIST_SUCCESS,
  GET_INSTRUCTOR_LIST_FAIL,
} from '../constants/instructorConstants';

export const getInstructorList = () => async dispatch => {
  try {
    dispatch({ type: GET_INSTRUCTOR_LIST_REQUEST });
    const { data } = await axios.get('/api/instructors');
    dispatch({ type: GET_INSTRUCTOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INSTRUCTOR_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};
