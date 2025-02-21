import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #4A90E2 0%, #50C878 100%);
  color: white;
`;

const Content = styled.div`
  animation: ${fadeIn} 1s ease-out;
  text-align: center;
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.medium};

  &.primary {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.large};
    }
  }

  &.secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.white};
    border: 2px solid ${props => props.theme.colors.white};

    &:hover {
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const CurrentInfo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const HomePage = () => {
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <Container>
      <CurrentInfo>
        <div>{currentDate} UTC</div>
        <div>Welcome, User</div>
      </CurrentInfo>
      <Content>
        <Title>Interactive Quiz Platform</Title>
        <Subtitle>Test your knowledge with our engaging quizzes!</Subtitle>
        <ButtonContainer>
          <Button to="/quiz" className="primary">Start Quiz</Button>
          <Button to="/history" className="secondary">View History</Button>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default HomePage;