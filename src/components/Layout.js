import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: ${props => props.theme.colors.background};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;