import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// REDUCERS
import {
  addCourseReviewReducer,
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
  userCourseReviewsReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  singleUserReducer,
  userListReducer,
  userUpdateReducer,
} from './reducers/adminReducers';

const reducer = combineReducers({
  // COURSE REDUCERS
  courseList: courseListReducer,
  topCourseList: topCourseListReducer,
  courseCategoryList: courseCategoryListReducer,
  instructorCourseList: instructorCourseListReducer,
  courseDetails: courseDetailsReducer,
  courseReview: addCourseReviewReducer,
  // INSTRUCTOR REDUCERS
  instructorList: instructorListReducer,
  instructorDetails: instructorDetailsReducer,
  // USER REDUCERS
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userCourseReviews: userCourseReviewsReducer,
  // ADMIN REDUCERS
  userList: userListReducer,
  singleUser: singleUserReducer,
  userUpdate: userUpdateReducer,
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
