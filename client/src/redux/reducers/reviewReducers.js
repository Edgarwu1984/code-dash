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

export const topReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOP_REVIEWS_REQUEST:
      return { loading: true };
    case GET_TOP_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };
    case GET_TOP_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
