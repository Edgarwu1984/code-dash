const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'admin',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/lego/7.jpg',
    isAdmin: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Grace Moreno',
    email: 'user1@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/women/64.jpg',
    isAdmin: false,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Judd Douglas',
    email: 'user2@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/men/68.jpg',
    isAdmin: false,
    lastTimeLogin: '',
    reviews: [],
  },
];

module.exports = users;
