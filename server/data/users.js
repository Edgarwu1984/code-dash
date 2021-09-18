const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'Edgar Wu',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://www.edgarwu.me/img/edgarwu.jpg',
    isAdmin: true,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Grace Moreno',
    email: 'user1@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/women/64.jpg',
    isAdmin: false,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Judd Douglas',
    email: 'user2@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/men/68.jpg',
    isAdmin: false,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Carla Scott',
    email: 'user3@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    isAdmin: false,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Brayden Gutierrez',
    email: 'user4@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/men/99.jpg',
    isAdmin: false,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Juan Armstrong',
    email: 'user5@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/men/97.jpg',
    isAdmin: false,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
  {
    username: 'Bessie Graves',
    email: 'user6@test.com',
    password: bcrypt.hashSync('123456', 10),
    photo: 'https://randomuser.me/api/portraits/women/10.jpg',
    isAdmin: false,
    isActivated: true,
    lastTimeLogin: '',
    reviews: [],
  },
];

module.exports = users;
