import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'redux/store';
import LoginPage from '../LoginPage';

// Create a copy and then delete the window's location property.
// Set the property with the reload function mocked.
// const location = window.location;
// delete window.location;
// window.location = {
//   ...location,
//   reload: jest.fn(),
// };

const mockFunc = jest.fn();

const MockLoginPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage history={mockFunc} />
      </BrowserRouter>
    </Provider>
  );
};

test('Should render the Email and Password input', () => {
  render(<MockLoginPage />);
  const emailInputElement = screen.getByPlaceholderText('Email');
  const passwordInputElement = screen.getByPlaceholderText('Password');
  expect(emailInputElement).toBeInTheDocument();
  expect(passwordInputElement).toBeInTheDocument();
});

test('Should allow to type text in the Email and Password input field', () => {
  render(<MockLoginPage />);
  const emailInputElement = screen.getByPlaceholderText('Email');
  const passwordInputElement = screen.getByPlaceholderText('Password');
  fireEvent.change(emailInputElement, { target: { value: 'user email' } });
  fireEvent.change(passwordInputElement, {
    target: { value: 'user password' },
  });
  expect(emailInputElement.value).toBe('user email');
  expect(passwordInputElement.value).toBe('user password');
});
