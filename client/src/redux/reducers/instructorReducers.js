import {
  GET_INSTRUCTOR_LIST_REQUEST,
  GET_INSTRUCTOR_LIST_SUCCESS,
  GET_INSTRUCTOR_LIST_FAIL,
} from '../constants/instructorConstants';

export const instructorListReducer = (state = { instructors: [] }, action) => {
  switch (action.type) {
    case GET_INSTRUCTOR_LIST_REQUEST:
      return { loading: true, instructors: [] };
    case GET_INSTRUCTOR_LIST_SUCCESS:
      return { loading: false, instructors: action.payload };
    case GET_INSTRUCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
