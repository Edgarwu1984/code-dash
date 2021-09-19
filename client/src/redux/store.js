import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// REDUCERS
import {
  courseCategoryListReducer,
  courseDetailsReducer,
  courseListReducer,
  instructorCourseListReducer,
  topCourseListReducer,
} from './reducers/courseReducers';
import {
  instructorDetailsReducer,
  instructorListReducer,
} from './reducers/instructorReducers';
import {
  userDetailsReducer,
  userDetailsUpdateReducer,
  userLoginReducer,
  userRegisterReducer,
  userDeleteReducer,
} from './reducers/userReducers';
import {
  courseUpdateReducer,
  singleUserReducer,
  userListReducer,
  userUpdateReducer,
} from './reducers/adminReducers';
import {
  createReviewReducer,
  deleteReviewReducer,
  topReviewsReducer,
} from './reducers/reviewReducers';

const reducer = combineReducers({
  // COURSE REDUCERS
  courseList: courseListReducer,
  topCourseList: topCourseListReducer,
  courseCategoryList: courseCategoryListReducer,
  courseDetails: courseDetailsReducer,
  instructorCourseList: instructorCourseListReducer,
  // INSTRUCTOR REDUCERS
  instructorList: instructorListReducer,
  instructorDetails: instructorDetailsReducer,
  // USER REDUCERS
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userDelete: userDeleteReducer,
  // ADMIN REDUCERS
  userList: userListReducer,
  singleUser: singleUserReducer,
  userUpdate: userUpdateReducer,
  courseUpdate: courseUpdateReducer,
  // REVIEW REDUCERS
  topReviews: topReviewsReducer,
  createReview: createReviewReducer,
  deleteReview: deleteReviewReducer,
});

// GET USER INFO FROM LOCAL STORAGE
const localUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: localUserInfo },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
