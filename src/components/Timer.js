import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  margin: 15px 0;
`;

const TimerBar = styled.div`
  height: 6px;
  background: ${props => props.theme.colors.gray.light};
  border-radius: 3px;
  overflow: hidden;
`;

const TimerProgress = styled.div`
  height: 100%;
  background: ${props => props.timeLeft < 10 ? props.theme.colors.error : props.theme.colors.primary};
  width: ${props => (props.timeLeft / props.duration) * 100}%;
  transition: width 1s linear;
`;

const TimeText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.timeLeft < 10 ? props.theme.colors.error : props.theme.colors.text};
  margin-top: 5px;
  font-weight: ${props => props.timeLeft < 10 ? 'bold' : 'normal'};
`;

const Timer = ({ duration = 30, onTimeUp = () => {} }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <TimerContainer>
      <TimerBar>
        <TimerProgress duration={duration} timeLeft={timeLeft} />
      </TimerBar>
      <TimeText timeLeft={timeLeft}>
        {timeLeft} seconds remaining
      </TimeText>
    </TimerContainer>
  );
};

export default Timer;