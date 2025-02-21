import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTimer } from '../context/TimerContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: ${props => props.theme.shadows.small};
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const InfoText = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const GlobalTimer = styled.div`
  background: ${props => props.timeLeft < 300 ? props.theme.colors.error : props.theme.colors.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  animation: ${props => props.timeLeft < 300 ? 'pulse 1s infinite' : 'none'};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const CurrentTime = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const Header = () => {
  const { globalTimeLeft, isQuizActive, formatTime } = useTimer();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const username = "vikasyadav01234";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  return (
    <HeaderContainer>
      <UserInfo>
        <Avatar>{username.substring(0, 2).toUpperCase()}</Avatar>
        <InfoText>{username}</InfoText>
      </UserInfo>
      
      {isQuizActive && (
        <GlobalTimer timeLeft={globalTimeLeft}>
          Time Remaining: {formatTime(globalTimeLeft)}
        </GlobalTimer>
      )}

      <CurrentTime>
        {formatCurrentTime(currentDateTime)} UTC
      </CurrentTime>
    </HeaderContainer>
  );
};

export default Header;