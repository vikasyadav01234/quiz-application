import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useIndexedDB from '../hooks/useIndexedDB';

// Move ALL styled components outside of the component function
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: #2C3E50;
  margin-bottom: 15px;
`;

const InfoText = styled.p`
  color: #666;
  margin: 5px 0;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const NewQuizButton = styled(Link)`
  background: #4A90E2;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
  }
`;

const AttemptCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const AttemptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const Score = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => 
    props.score >= 80 ? '#2ECC71' : 
    props.score >= 60 ? '#3498DB' : 
    '#E74C3C'
  };
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;

  h4 {
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 5px;
  }

  p {
    color: #2C3E50;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const NoAttemptsMessage = styled.div`
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
  color: #666;
`;

const DateText = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const HistoryPage = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAttempts, isInitialized } = useIndexedDB();
  const username = "User";

  useEffect(() => {
    let isMounted = true;

    const loadAttempts = async () => {
      if (!isInitialized) {
        console.log("Waiting for DB initialization...");
        return;
      }

      try {
        console.log("Loading attempts...");
        const data = await getAttempts();
        console.log("Retrieved data:", data);

        if (isMounted) {
          if (Array.isArray(data)) {
            const userAttempts = data
              .filter(attempt => attempt.username === username)
              .sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log("Filtered attempts:", userAttempts);
            setAttempts(userAttempts);
            setError(null);
          } else {
            console.log("No data or invalid data format");
            setAttempts([]);
          }
        }
      } catch (error) {
        console.error("Error loading attempts:", error);
        if (isMounted) {
          setError("Failed to load quiz history. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (isInitialized) {
      loadAttempts();
    }

    return () => {
      isMounted = false;
    };
  }, [getAttempts, username, isInitialized]);
  // Add debug info
  console.log("Current state:", { loading, error, attempts, isInitialized });
  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}`;
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <Title>Quiz History</Title>
          <InfoText>
            Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): {formatDateTime(new Date())}
          </InfoText>
          <InfoText>
            Current User's Login: {username}
          </InfoText>
        </HeaderInfo>
        <ButtonContainer>
          <NewQuizButton to="/quiz">Take New Quiz</NewQuizButton>
        </ButtonContainer>
      </Header>

      {!isInitialized ? (
        <LoadingMessage>Initializing database...</LoadingMessage>
      ) : loading ? (
        <LoadingMessage>Loading quiz history...</LoadingMessage>
      ) : error ? (
        <NoAttemptsMessage>
          <h3>{error}</h3>
          <p>Please try again or start a new quiz.</p>
          <NewQuizButton to="/quiz">Take New Quiz</NewQuizButton>
        </NoAttemptsMessage>
      ) : attempts.length === 0 ? (
        <NoAttemptsMessage>
          <h3>No quiz attempts yet</h3>
          <p>Take your first quiz to see your history here!</p>
          <NewQuizButton to="/quiz">Start Your First Quiz</NewQuizButton>
        </NoAttemptsMessage>
      ) : (
        attempts.map((attempt) => (
          <AttemptCard key={attempt.id}>
            <AttemptHeader>
              <Score score={attempt.score}>
                Score: {attempt.score.toFixed(1)}%
              </Score>
              <DateText>{formatDateTime(attempt.date)}</DateText>
            </AttemptHeader>
            <StatsGrid>
              <StatItem>
                <h4>Total Questions</h4>
                <p>{attempt.totalQuestions}</p>
              </StatItem>
              <StatItem>
                <h4>Time Spent</h4>
                <p>{attempt.timeSpent} seconds</p>
              </StatItem>
              <StatItem>
                <h4>Avg. Time/Question</h4>
                <p>{(attempt.timeSpent / attempt.totalQuestions).toFixed(1)}s</p>
              </StatItem>
            </StatsGrid>
          </AttemptCard>
        ))
      )}
    </Container>
  );
};

export default HistoryPage;