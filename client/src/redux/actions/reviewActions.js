import axios from 'axios';
import { apiUrl } from 'config';
import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  GET_TOP_REVIEWS_FAIL,
  GET_TOP_REVIEWS_REQUEST,
  GET_TOP_REVIEWS_SUCCESS,
} from '../constants/reviewConstants';
import { ERROR_RESET } from '../constants/userConstants';

export const getTopReviews = () => async dispatch => {
  try {
    dispatch({ type: GET_TOP_REVIEWS_REQUEST });

    const { data } = await axios.get(`${apiUrl}/api/reviews/top`);
    dispatch({ type: GET_TOP_REVIEWS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_TOP_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};

export const createCourseReview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${apiUrl}/api/courses/${id}/reviews`, review, config);
      dispatch({ type: CREATE_REVIEW_SUCCESS });
      dispatch({ type: CREATE_REVIEW_RESET });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.messages
            ? error.response.data.messages
            : error.messages,
      });
      dispatch({ type: ERROR_RESET });
    }
  };

export const deleteCourseReview = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${apiUrl}/api/courses/${id}/reviews`, config);
    dispatch({ type: DELETE_REVIEW_SUCCESS });
    dispatch({ type: DELETE_REVIEW_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};
