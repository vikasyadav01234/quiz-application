import React from 'react';
import styled, { keyframes } from 'styled-components';

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const ScoreboardContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.large};
  animation: ${scaleIn} 0.5s ease-out;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 20px;
  }
`;

const ScoreCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => {
    if (props.score >= 80) return props.theme.colors.success;
    if (props.score >= 60) return props.theme.colors.primary;
    return props.theme.colors.error;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  box-shadow: ${props => props.theme.shadows.medium};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
    font-size: 2.5rem;
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
  font-size: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const StatItem = styled.div`
  padding: 15px;
  background: ${props => props.theme.colors.gray.light};
  border-radius: 10px;

  h3 {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text};
    margin-bottom: 5px;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 30px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Scoreboard = ({ answers, totalQuestions, timeSpent, onRetry }) => {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const score = (correctAnswers / totalQuestions) * 100;

  return (
    <ScoreboardContainer>
      <Title>Quiz Complete!</Title>
      <ScoreCircle score={score}>
        {score.toFixed(0)}%
      </ScoreCircle>
      <Stats>
        <StatItem>
          <h3>Correct Answers</h3>
          <p>{correctAnswers}/{totalQuestions}</p>
        </StatItem>
        <StatItem>
          <h3>Time Spent</h3>
          <p>{timeSpent}s</p>
        </StatItem>
        <StatItem>
          <h3>Avg. Time/Question</h3>
          <p>{(timeSpent/totalQuestions).toFixed(1)}s</p>
        </StatItem>
      </Stats>
      <Button onClick={onRetry}>Try Again</Button>
    </ScoreboardContainer>
  );
};

export default Scoreboard;