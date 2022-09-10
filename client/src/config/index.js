const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://code-dash.onrender.com'
    : 'http://localhost:5500';

export { apiUrl };
