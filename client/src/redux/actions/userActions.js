import axios from 'axios';
import { apiUrl } from 'config';
import {
  ERROR_RESET,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_RESET,
  GET_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_RESET,
  UPDATE_USER_DETAILS_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${apiUrl}/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};

export const logoutUser = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GET_USER_DETAILS_RESET });
  document.location.href = '/';
};

export const registerUser = (username, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${apiUrl}/api/users/register`,
      { username, email, password },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${apiUrl}/api/users/profile`, config);

    dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};

export const updateUserDetails = user => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${apiUrl}/api/users/profile`,
      user,
      config
    );

    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data.data });
    dispatch({ type: UPDATE_USER_DETAILS_RESET });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};

export const deleteUser = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    // GET ADMIN TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`${apiUrl}/api/users/profile`, user, config);
    dispatch({ type: USER_DELETE_SUCCESS });
    dispatch({ type: USER_DELETE_RESET });
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: GET_USER_DETAILS_RESET });
    // document.location.href = '/';
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
    dispatch({ type: ERROR_RESET });
  }
};
