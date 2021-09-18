const courses = [
  {
    category: 'web-dev',
    courseCategory: 'php',
    name: 'PHP: The Complete PHP Course',
    image: '/images/courses/php.jpg',
    description:
      'Learn to master modern PHP MVC core development step-by-step, and build your eCommerce store in less than 30 days.',
    language: 'english',
    duration: '45hr',
    instructor: '614586678177566f6e9c1d17',
    features: [
      'Build Your Own Modern PHP MVC framework',
      'Organize your PHP code into models, views and controllers',
      'Querying Data For Dashboard Reporting PHP & ChartJs',
      'Build and Deploy eCormmerce Website to Production',
    ],
    content: [
      {
        contentListName: 'Welcome to the course',
        contentList: [
          'Project overview',
          'How to ask for help and access free OOP Bootcamp course',
          'How to get the source code',
        ],
      },
      {
        contentListName: 'Getting started with PHP MVC project setup',
        contentList: [
          'Project setup and directions structure',
          'Setup environment variables and initialize App',
        ],
      },
      {
        contentListName: 'Building the MVC architecture',
        contentList: [
          'Installing Foundation sites, Motion UI and Slick-carousel',
          'Task Automation with Gulp and Laravel Elixir',
          'Setup Routing and Mod Rewrite',
          'Creating our first Controller',
        ],
      },
    ],
  },
  {
    category: 'web-dev',
    courseCategory: 'html',
    name: 'Learn HTML - For Beginners',
    image: '/images/courses/html.jpg',
    description: 'Lean how to create web pages using HTML',
    language: 'english',
    duration: '2hr 16min',
    instructor: '614586678177566f6e9c1d17',
    features: [
      'How to Code in HTML',
      'Text Formatting in HTML',
      'Creating Links',
      'Tables & Nested Tables',
      'Embedding iframes',
      'Structure of an HTML Page',
    ],
    content: [
      {
        contentListName: 'Getting start with HTML',
        contentList: ['Introduction to HTML', 'Basic structure of a web page'],
      },
      {
        contentListName: 'HTML Elements',
        contentList: [
          'HTML head tag',
          'HTML body tag',
          'HTML Paragraph Spacing',
          'HTML Line Breaks',
          'HTML header tag',
        ],
      },
    ],
  },
  {
    category: 'web-dev',
    courseCategory: 'javascript',
    name: 'Modern JavaScript From The Beginning',
    image: '/images/courses/javascript.jpg',
    description:
      'Learn and build projects with pure JavaScript (No frameworks or libraries)',
    language: 'english',
    duration: '10hr 5min',
    instructor: '614586678177566f6e9c1d1a',
    features: [
      'Modular learning sections & 10 real world projects with pure JavaScript',
      'Master the DOM (document object model) WITHOUT jQuery',
      'Asynchronous programming with Ajax, Fetch API, Promises & Async / Await',
      'OOP including ES5 prototypes & ES2015 classes',
      'Learn JavaScript Patterns',
      'Regular expressions, error handling, localStorage & more',
    ],
    content: [
      {
        contentListName: 'Intro & Getting Started',
        contentList: [
          'Welcome to the course',
          'Project files & questions',
          'Visual studio code setup',
        ],
      },
      {
        contentListName: 'JavaScript Language Fundamentals',
        contentList: [
          'Section into & file setup',
          'Using the console',
          'Variables - var, let & const',
          'Data types in JavaScript',
          'Type conversion',
          'Numbers & The match object',
        ],
      },
      {
        contentListName: 'DOM Manipulation & Events',
        contentList: [
          'What is the DOM?',
          'Examining the document object',
          'DOM selector for single elements',
          'Traversing the DOM',
          'Creating elements',
          'Removing & Replacing Elements',
        ],
      },
    ],
  },
  {
    category: 'web-dev',
    courseCategory: 'react',
    name: 'React - The Complete Guide',
    image: '/images/courses/react.jpg',
    description:
      'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    language: 'english',
    duration: '16hr',
    instructor: '614586678177566f6e9c1d1a',
    features: [
      'Build powerful, fast, user-friendly and reactive web apps',
      'Provide amazing user experiences by leveraging the power of JavaScript with ease',
      'Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now',
      'Learn all about React Hooks and React Components',
    ],
    content: [
      {
        contentListName: 'Getting Started',
        contentList: [
          'Welcome to the course',
          'What is React.js',
          'Why React instead of vanilla Javascript',
          'Building single-page applications with React',
        ],
      },
      {
        contentListName: 'JavaScript Refresher',
        contentList: [
          'Module introduction',
          'Understanding let and const',
          'Arrow function',
          'Exports and imports',
          'Understanding Classes',
        ],
      },
      {
        contentListName: 'React Basics & Working With Components',
        contentList: [
          'Module Introduction',
          'What Are Components? And Why Is React All About Them?',
          'Creating a new React Project',
          'Analyzing a Standard React Project',
          'Introducing JSX',
          'How React Works',
        ],
      },
    ],
  },
  {
    category: 'game-dev',
    courseCategory: 'unity',
    name: 'Complete C# Unity Game Developer 2D',
    image: '/images/courses/game_dev_01.jpg',
    description:
      'Learn Unity in C# & Code Your First Seven 2D Video Games for Web, Mac & PC. The Tutorials Cover Tilemap',
    language: 'english',
    duration: '35hr',
    instructor: '614586678177566f6e9c1d18',
    features: [
      'Learn C#, a powerful modern language, from scratch. No prior programming experience is necessary.',
      'Become excellent at using the Unity game engine.',
      'Build a solid foundation for game design and game development that will help you build your own games.',
      'Learn how object oriented programming works in practice.',
    ],
    content: [
      {
        contentListName: 'Introduction & Setup',
        contentList: [
          'Welcome to the course',
          'Download Unity & Visual Studio',
          'Your first code',
          'Fixing Visual Studio problems',
        ],
      },
      {
        contentListName: 'Number Wizard - Basic C# Coding',
        contentList: [
          'Print to console with debug.log()',
          'Introducing variables',
          'Respond To Player Input',
          'Using if, else if & else',
          'Calculate Guess Variable',
        ],
      },
      {
        contentListName: 'Text101',
        contentList: [
          'Text101 game design',
          'Creating Sprites In Unity',
          'UI Canvas & Text',
          'Update Text Component',
          'Game States',
          'Unity Scriptable Objects',
        ],
      },
    ],
  },
  {
    category: 'game-dev',
    courseCategory: 'ue4',
    name: 'Unreal Engine Blueprint Game Developer',
    image: '/images/courses/game_dev_02.jpg',
    description: 'Unreal Engine Blueprint Game Developer',
    language: 'english',
    duration: '12hr',
    instructor: '614586678177566f6e9c1d18',
    features: [
      'Create simple complete games to share with friends.',
      'Develop using the Unreal Engine 4 editor.',
      'Learn to program using Blueprints, without needing to write code.',
      'Create and package playable game projects.',
    ],
    content: [
      {
        contentListName: 'Introduction',
        contentList: [
          'Getting started with Unreal Engine 4',
          'First Steps in Unreal Engine 4',
          'Viewport Navigation & Transforms',
          'Blueprint Introduction',
          'Referencing Actors in Blueprints',
        ],
      },
      {
        contentListName: 'Crystal Cavern',
        contentList: [
          'Crystal Cavern Project Setup',
          'Level Blockout & Lighting',
          'Point Lights, Spot Lights & Sky Lights',
          'Blueprint Actor Class',
          'Player Pawn',
        ],
      },
      {
        contentListName: 'Mars Marine',
        contentList: [
          'Project Introduction & Download',
          'Game Mode & Character Class Setup',
          'Assigning Character Meshes',
          'Character Movement Input',
          'Animation Blueprints',
          'State Machine Transition Rules',
        ],
      },
    ],
  },
  {
    category: 'game-dev',
    courseCategory: 'zbrush',
    name: '3D Game Character Creature - Full Complete Pipeline',
    image: '/images/courses/game_dev_03.jpg',
    description:
      'Learn How to Model sculpt and Texture a Character Creature using Zbrush, Maya, Substance Painter, Photoshop, Unreal',
    language: 'english',
    duration: '14hr 16min',
    instructor: '614586678177566f6e9c1d19',
    features: [
      'Create a full body character suitable for games',
      'Understand the reasons behind retopologizing',
      'Design creatures in a logical and creative manner',
      'Create skin and eye textures',
      'Understand how to make clean production-ready topology',
      'Texture and light for presentation',
    ],
    content: [
      {
        contentListName: 'Introduction',
        contentList: ['Introduction'],
      },
      {
        contentListName: 'Vol.1: Sculpting the Creature',
        contentList: [
          'Vol.1 overview',
          'Proportions and Base Mesh',
          'Torso',
          'Arms',
          'Legs',
          'Head',
        ],
      },
      {
        contentListName: 'Vol.2: Retopologizing, Unwrapping, Texturing',
        contentList: [
          'Vol.2 overview',
          'Retopology intro',
          'Retopology tools',
          'Retopology torso',
          'Retopology face main loops',
        ],
      },
    ],
  },
  {
    category: 'game-dev',
    courseCategory: 'blender',
    name: 'Blender Character Modeling For Beginners HD',
    image: '/images/courses/game_dev_04.jpg',
    description: 'Learn to Model a 3D Character In Blender',
    language: 'english',
    duration: '12hr 35min',
    instructor: '614586678177566f6e9c1d19',
    features: [
      'You will learn how to model a 3D human character in Blender for animations and video games',
      'You will learn how to use Blender software and become proficient with its features',
    ],
    content: [
      {
        contentListName: 'Introduction To Course and Blender Overview',
        contentList: ['Introduction to course', 'General overview of Blender'],
      },
      {
        contentListName: 'Modeling the Human Head',
        contentList: [
          'Modeling the human head',
          'Modeling the nose',
          'Modeling the eyes',
          'Modeling the ear',
        ],
      },
      {
        contentListName: 'Modeling the Human Body',
        contentList: [
          'Modeling the human body Part 1',
          'Modeling the human body Part 2',
          'Modeling the human body Part 3',
          'Modeling the human body Part 4',
        ],
      },
    ],
  },
];

module.exports = courses;
