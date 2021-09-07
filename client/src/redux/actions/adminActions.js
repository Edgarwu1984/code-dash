import axios from 'axios';
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

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_USERS_REQUEST });

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

    const { data } = await axios.get('/api/users', config);

    dispatch({ type: ADMIN_GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAIL,
      payload: error.message,
    });
  }
};

export const getUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_USER_REQUEST });

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

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: ADMIN_GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USER_FAIL,
      payload: error.message,
    });
  }
};

export const updateUser = (id, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

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

    const { data } = await axios.put(
      `/api/users/${id}`,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      config
    );

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data });
    dispatch({ type: ADMIN_UPDATE_USER_RESET });
    dispatch({ type: ADMIN_GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload: error.message,
    });
  }
};
