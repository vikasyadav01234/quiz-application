import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Question = styled.h2`
  color: #2C3E50;
  font-size: 1.5rem;
  margin-bottom: 25px;
`;

const Options = styled.div`
  display: grid;
  gap: 15px;
`;

const OptionButton = styled.button`
  padding: 15px 20px;
  border: 2px solid #E0E0E0;
  border-radius: 10px;
  background: white;
  color: #2C3E50;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  position: relative;

  &:hover {
    border-color: #4A90E2;
    background: #F8F9FA;
    transform: translateY(-2px);
  }

  &:before {
    content: ${props => `"${props.optionLetter}"`};
    position: absolute;
    left: 15px;
    color: #4A90E2;
    font-weight: bold;
  }
`;

const QuizCard = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <Card>
      <Question>{question.question}</Question>
      <Options>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => onAnswer(index)}
            optionLetter={letters[index]}
          >
            <span style={{ marginLeft: '25px' }}>{option}</span>
          </OptionButton>
        ))}
      </Options>
    </Card>
  );
};

export default QuizCard;