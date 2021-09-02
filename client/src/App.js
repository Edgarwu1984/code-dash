import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/Courses';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/courses' component={CoursesPage} />
        <Route path='/about' component={AboutPage} />
      </Switch>
    </Router>
  );
}

export default App;
