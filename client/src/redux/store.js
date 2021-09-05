import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  courseCategoryListReducer,
  courseDetailsReducer,
  courseListReducer,
} from './reducers/courseReducers';
import { instructorListReducer } from './reducers/instructorReducers';

const reducer = combineReducers({
  courseList: courseListReducer,
  courseCategoryList: courseCategoryListReducer,
  courseDetails: courseDetailsReducer,
  instructorList: instructorListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
