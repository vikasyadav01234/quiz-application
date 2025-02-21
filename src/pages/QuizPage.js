import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { questions } from '../data/questions';
import QuizCard from '../components/QuizCard';
import Scoreboard from '../components/Scoreboard';
import useIndexedDB from '../hooks/useIndexedDB';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4A90E2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const DateTime = styled.div`
  text-align: right;
  color: #666;
  font-size: 0.9rem;
`;

const Instructions = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;

  h2 {
    color: #2C3E50;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin: 10px 0;
      padding-left: 24px;
      position: relative;

      &:before {
        content: "•";
        color: #4A90E2;
        font-size: 1.5em;
        position: absolute;
        left: 0;
        top: -4px;
      }
    }
  }
`;

const Timer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.timeLeft < 300 ? '#E74C3C' : '#2C3E50'};
  margin: 20px 0;
  padding: 10px;
  border-radius: 8px;
  background: ${props => props.timeLeft < 300 ? 'rgba(231, 76, 60, 0.1)' : 'rgba(52, 152, 219, 0.1)'};
`;

const StartButton = styled.button`
  padding: 15px 30px;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
  width: 100%;
  max-width: 200px;

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
  }
`;

const Progress = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 1.1rem;
`;

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [finalTimeSpent, setFinalTimeSpent] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { saveAttempt } = useIndexedDB();
  const navigate = useNavigate();

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Quiz timer
  useEffect(() => {
    let timer;
    if (hasStarted && !isComplete && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [hasStarted, isComplete]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  const handleStart = () => {
    setHasStarted(true);
    setQuizStartTime(Date.now());
    setTimeLeft(30 * 60); // Reset timer to 30 minutes
  };

  const handleAnswer = (selectedAnswer) => {
    const newAnswer = {
      questionId: questions[currentQuestion].id,
      selectedAnswer,
      isCorrect: selectedAnswer === questions[currentQuestion].correctAnswer
    };

    setAnswers([...answers, newAnswer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    if (!isComplete) {
      const timeSpent = 1800 - timeLeft;
      setFinalTimeSpent(timeSpent);
      setIsComplete(true);
      const correctAnswers = answers.filter(a => a.isCorrect).length;
  
      const attemptData = {
        username: "User",
        score: (correctAnswers / questions.length) * 100,
        totalQuestions: questions.length,
        timeSpent,
        answers: answers.map(a => ({
          questionId: a.questionId,
          selectedAnswer: a.selectedAnswer,
          isCorrect: a.isCorrect
        }))
      };
  
      try {
        console.log("Saving attempt data:", attemptData);
        await saveAttempt(attemptData);
        console.log("Quiz attempt saved successfully");
      } catch (error) {
        console.error("Error saving quiz attempt:", error);
      }
    }
  };
  
  const username = "User";
  const handleRetry = () => {
    // Reset all states
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setHasStarted(false);
    setQuizStartTime(null);
    setTimeLeft(30 * 60);
    setFinalTimeSpent(0);
    navigate('/');
  };

  if (!hasStarted) {
    return (
      <Container>
        <Header>
          <UserInfo>
            <Avatar>{username.substring(0, 2).toUpperCase()}</Avatar>
            <div>User</div>
          </UserInfo>
          <DateTime>{formatDateTime(currentDateTime)}</DateTime>
        </Header>
        <Instructions>
          <h2>Quiz Instructions</h2>
          <ul>
            <li>You have 30 minutes to complete all questions</li>
            <li>Each question must be answered in order</li>
            <li>You cannot return to previous questions</li>
            <li>Total questions: {questions.length}</li>
            <li>The quiz will automatically submit when time runs out</li>
            <li>Your score will be saved and viewable in the history</li>
          </ul>
          <StartButton onClick={handleStart}>Start Quiz</StartButton>
        </Instructions>
      </Container>
    );
  }

  if (isComplete) {
    return (
      <Container>
        <Header>
          <UserInfo>
            <Avatar>U</Avatar>
            <div>User</div>
          </UserInfo>
          <DateTime>{formatDateTime(currentDateTime)}</DateTime>
        </Header>
        <Scoreboard
          answers={answers}
          totalQuestions={questions.length}
          timeSpent={finalTimeSpent}
          onRetry={handleRetry}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar>VI</Avatar>
          <div>User</div>
        </UserInfo>
        <DateTime>{formatDateTime(currentDateTime)}</DateTime>
      </Header>
      <Timer timeLeft={timeLeft}>
        Time Remaining: {formatTime(timeLeft)}
      </Timer>
      <QuizCard
        question={questions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
      <Progress>
        Question {currentQuestion + 1} of {questions.length}
      </Progress>
    </Container>
  );
};

export default QuizPage;