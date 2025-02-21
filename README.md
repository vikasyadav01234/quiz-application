# Quiz Application

A dynamic quiz application built with React that features timed quizzes, score tracking, and persistent quiz history using IndexedDB.

## Features

- Interactive quiz interface
- Timer functionality (30 minutes per quiz)
- Score calculation and history tracking
- Persistent storage using IndexedDB
- Responsive design for all devices
- Real-time score updates
- UTC time tracking for attempts

## Tech Stack

- **Frontend Framework:** React.js
- **Styling:** Styled Components
- **Storage:** IndexedDB
- **State Management:** React Hooks
- **Routing:** React Router
- **Date Handling:** Native JavaScript Date API
- **Package Manager:** npm/yarn

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- Modern web browser with IndexedDB support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vikasyadav01234/quiz-application.git
cd quiz-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
quiz-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── QuizCard.js
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── QuizPage.js
│   │   └── HistoryPage.js
│   ├── hooks/
│   │   └── useIndexedDB.js
│   ├── styles/
│   │   └── GlobalStyles.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Features in Detail

### Quiz Taking
- Multiple choice questions
- 30-minute timer per quiz
- Real-time score calculation
- Immediate feedback on answers

### History Tracking
- Stores quiz attempts with:
  - Score percentage
  - Time taken
  - Date and time (UTC)
  - Number of questions
  - Average time per question

### Data Persistence
- Uses IndexedDB for offline storage
- Maintains quiz history across sessions
- Automatic data cleanup

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Styling

The application uses Styled Components for styling with a clean, modern design:
- Responsive layout
- Material Design principles
- Accessible color schemes
- Mobile-first approach

## Browser Support

The application supports all modern browsers with IndexedDB capability:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Create React App for the initial project setup
- Styled Components for the styling solution
- React Router for navigation
- All contributors who participate in this project

## Contact

Your Name - [@vikasyadav01234](https://github.com/vikasyadav01234)

Project Link: [https://github.com/vikasyadav01234/quiz-application](https://github.com/vikasyadav01234/quiz-application)