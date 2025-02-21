import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import HistoryPage from './pages/HistoryPage';
import ErrorBoundary from './components/ErrorBoundary';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
`;

function App() {
  return (
    <ErrorBoundary>
      <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </AppContainer>
    </ErrorBoundary>
  );
}

export default App;