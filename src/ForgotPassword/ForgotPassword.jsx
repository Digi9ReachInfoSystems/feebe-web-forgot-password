import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Title,
  InputGroup,
  Input,
  IconButton,
  ConditionsSection,
  ConditionItem,
  DoneButton,
  ErrorMessage,
  SuccessMessage
} from './ForgotPassword.styles';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const passwordConditions = [
  'Password cannot be same as user name',
  'Password length is between 8 and 50 characters',
  'Password should have numbers & characters'
];

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(0);
  const [params] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = params.get("token");
    if (!token) return setStatus("invalid");

    axios.get(`https://feebecreate-account.vercel.app/validateSignature?token=${token}`)
      .then((res) => {
        setStatus("valid");
      })
      .catch(() => {
        setStatus("invalid");
      });
  }, []);

  const validatePassword = () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Check password length
    if (newPassword.length < 8 || newPassword.length > 50) {
      setError('Password must be between 8 and 50 characters');
      return false;
    }

    // Check for at least one number and one character
    if (!/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
      setError('Password must contain both letters and numbers');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePassword()) {
      return;
    }
     axios.get(`https://feebecreate-account.vercel.app/validateSignature?token=${params.get("token")}`)
      .then((res) => {
        setStatus("valid");
      })
      .catch(() => {
        setStatus("invalid");
        return;
      });

    try {
      setLoading(true);

      axios.post('https://feebecreate-account.vercel.app/reset-password', {
        token: params.get("token"),
        newPassword,
      });

      setSuccess('Password reset successfully! ');

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status === "checking" ? (<Container>
        <p>Verifying...</p>
      </Container>) :
        (<>
          {
            status === "invalid" ? (<Container>
              <p>❌ Link expired or already used.</p>
            </Container>) :
              (<>

                <Container>
                  <Header>
                    <Title>FEEBE</Title>
                    <div className="dot" />
                  </Header>

                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  {success && <SuccessMessage>{success}</SuccessMessage>}

                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <IconButton
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputGroup>

                  <InputGroup>
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <IconButton
                      type="button"
                      onClick={() => setShowConfirm(prev => !prev)}
                    >
                      {showConfirm ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputGroup>

                  <ConditionsSection>
                    <h4>Password conditions</h4>
                    {passwordConditions.map((text, index) => (
                      <ConditionItem key={index}>
                        <input
                          type="radio"
                          name="passwordCondition"
                          checked={selectedCondition === index}
                          onChange={() => setSelectedCondition(index)}
                        />
                        <span>{text}</span>
                      </ConditionItem>
                    ))}
                  </ConditionsSection>

                  <DoneButton
                    onClick={(e) => {
                      handleSubmit(e)
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Done'}
                  </DoneButton>
                </Container>
              </>)

          }
        </>)}
    </>
  );
};

export default ForgotPassword;