import {
  GET_COURSE_LIST_REQUEST,
  GET_COURSE_LIST_SUCCESS,
  GET_COURSE_LIST_FAIL,
  GET_COURSE_DETAILS_REQUEST,
  GET_COURSE_DETAILS_SUCCESS,
  GET_COURSE_DETAILS_FAIL,
  GET_COURSE_CATEGORY_LIST_SUCCESS,
  GET_COURSE_CATEGORY_LIST_REQUEST,
  GET_COURSE_CATEGORY_LIST_FAIL,
  ADD_COURSE_REVIEW_SUCCESS,
  ADD_COURSE_REVIEW_FAIL,
  ADD_COURSE_REVIEW_REQUEST,
  ADD_COURSE_REVIEW_RESET,
  GET_TOP_COURSES_REQUEST,
  GET_TOP_COURSES_SUCCESS,
  GET_TOP_COURSES_FAIL,
} from '../constants/courseConstants';

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case GET_COURSE_LIST_REQUEST:
      return { loading: true, courses: [] };
    case GET_COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case GET_COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topCourseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case GET_TOP_COURSES_REQUEST:
      return { loading: true, courses: [] };
    case GET_TOP_COURSES_SUCCESS:
      return { loading: false, courses: action.payload };
    case GET_TOP_COURSES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseCategoryListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case GET_COURSE_CATEGORY_LIST_REQUEST:
      return { loading: true, courses: [] };
    case GET_COURSE_CATEGORY_LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case GET_COURSE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case GET_COURSE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case GET_COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case GET_COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addCourseReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COURSE_REVIEW_REQUEST:
      return { loading: true };
    case ADD_COURSE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case ADD_COURSE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case ADD_COURSE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
