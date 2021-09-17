import axios from 'axios';
import {
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_RESET,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_USER_FAIL,
  ADMIN_GET_USER_REQUEST,
  ADMIN_GET_USER_SUCCESS,
  ADMIN_UPDATE_COURSE_FAIL,
  ADMIN_UPDATE_COURSE_REQUEST,
  ADMIN_UPDATE_COURSE_RESET,
  ADMIN_UPDATE_COURSE_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
} from '../constants/adminConstants';
import { GET_COURSE_LIST_SUCCESS } from '../constants/courseConstants';

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

    dispatch({ type: ADMIN_GET_USERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
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

    dispatch({ type: ADMIN_GET_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
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

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data.data });
    dispatch({ type: ADMIN_UPDATE_USER_RESET });
    dispatch({ type: ADMIN_GET_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST });

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

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: ADMIN_DELETE_USER_SUCCESS });
    dispatch({ type: ADMIN_DELETE_USER_RESET });
    dispatch({ type: ADMIN_GET_USERS_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const updateCourse = (id, course) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATE_COURSE_REQUEST });

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
      `/api/courses/${id}`,
      {
        _id: course._id,
        name: course.name,
        image: course.image,
        category: course.category,
        courseCategory: course.courseCategory,
        instructor: course.instructor,
        description: course.description,
        language: course.language,
        duration: course.duration,
        features: course.features,
        content: course.content,
      },
      config
    );

    dispatch({ type: ADMIN_UPDATE_COURSE_SUCCESS, payload: data.data });
    dispatch({ type: ADMIN_UPDATE_COURSE_RESET });
    dispatch({ type: GET_COURSE_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};
