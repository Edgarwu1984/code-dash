import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/Courses';
import CoursePage from './pages/Courses/CoursePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import CourseCategoryPage from './pages/Courses/CourseCategoryPage';

function App() {
  return (
    <Router>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Slide}
      />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/courses' component={CoursesPage} />
        <Route exact path='/courses/:category' component={CourseCategoryPage} />
        <Route path='/courses/:category/:id/:name' component={CoursePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
