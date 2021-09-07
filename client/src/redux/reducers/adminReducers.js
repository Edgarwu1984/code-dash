import {
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_USER_FAIL,
  ADMIN_GET_USER_REQUEST,
  ADMIN_GET_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
} from '../constants/adminConstants';

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return { loading: true };
    case ADMIN_GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_GET_USER_REQUEST:
      return { loading: true, ...state };
    case ADMIN_GET_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case ADMIN_GET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};
