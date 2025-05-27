import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
//   align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  gap: 30px;

  .dot {
    width: 30px;
    height: 30px;
    background-color: #1e60ff;
    border-radius: 50%;
  }
`;

export const Title = styled.h3`
  font-size: 25px;
  margin: 0;
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
 
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 40px 14px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #1e60ff;
  }
`;

export const IconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 18px;
`;

export const ConditionsSection = styled.div`

  h4 {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const ConditionItem = styled.label`
  display: flex;
  align-items: center;
  margin: 8px 0;
  font-size: 16px;
  gap: 10px;


  input[type='radio'] {
    accent-color: #1e60ff;
    width: 16px;
    height: 16px;
  }

  span {
    color: #333;
  }
`;

export const DoneButton = styled.button`
  margin-top: 30px;
  width: 100%;
  background: #1e60ff;
  color: white;
  font-size: 16px;
  padding: 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #194dcc;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  padding: 0.8rem;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

export const SuccessMessage = styled.div`
  width: 100%;
  padding: 0.8rem;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;
