import {
  GET_USER_COURSE_REVIEWS_FAIL,
  GET_USER_COURSE_REVIEWS_REQUEST,
  GET_USER_COURSE_REVIEWS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_RESET,
  GET_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_RESET,
  UPDATE_USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case GET_USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userDetailsUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS_REQUEST:
      return { loading: true };
    case UPDATE_USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case UPDATE_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userCourseReviewsReducer = (state = { myReviews: [] }, action) => {
  switch (action.type) {
    case GET_USER_COURSE_REVIEWS_REQUEST:
      return { loading: true, myReviews: [] };
    case GET_USER_COURSE_REVIEWS_SUCCESS:
      return { loading: false, myReviews: action.payload };
    case GET_USER_COURSE_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
