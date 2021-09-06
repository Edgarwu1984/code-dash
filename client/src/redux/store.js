import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  courseCategoryListReducer,
  courseDetailsReducer,
  courseListReducer,
} from './reducers/courseReducers';
import { instructorListReducer } from './reducers/instructorReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  courseList: courseListReducer,
  courseCategoryList: courseCategoryListReducer,
  courseDetails: courseDetailsReducer,
  instructorList: instructorListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
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
