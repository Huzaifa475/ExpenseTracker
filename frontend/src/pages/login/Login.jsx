import React, { useState, useEffect} from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePushState = (event) => {
      if(window.location.pathname === 'login'){
        window.history.pushState(null, '', window.location.pathname)
      }
    }

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePushState);

    return () => {
      window.removeEventListener('popstate', handlePushState);
    };
  }, [location.pathname])

  const handleClick = () => {
    setShowPassword(prev => !prev);
    setPassword('')
    setUsername('')
  }

  axios.defaults.withCredentials = true;
  const handleLogin = async () => {
    let res;
    try {
      res = await axios({
        method: "post",
        url: "https://expense-tracker-blue-pi.vercel.app/api/v1/users/login",
        data: {
          username,
          password
        }
      })
      navigate('/home')
    }
    catch (error) {
      if (error.response) {
        const errorMessage = extractErrorMessage(error.response?.data);
        console.log(errorMessage);
        if (!errorMessage) {
          toast.error("Internal Server Error", {
            style: {
              "color": "#d9d9d9",
              "backgroundColor": "#2e2e2e"
            }
          })
        }
        else {
          toast.error(`${errorMessage}`)
        }
      }
      else if (error.request) {
        console.log("no response");
      } else {
        console.log(error.message);
      }
    }
  }

  const extractErrorMessage = (response) => {
    const htmlDoc = new DOMParser().parseFromString(response, 'text/html');
    const errorText = htmlDoc.body.textContent.trim();

    let message = "";
    for (let i = 0; i < errorText.length; i++) {
      if (errorText[i] == 'a' && errorText[i + 1] == 't') {
        break;
      }
      message += errorText[i];
    }
    message = message.substring(message.indexOf(':') + 2);
    message = message.substring(0, message.length - 4);
    return message;
  };
  return (
    <>
      <div className="login-container">
        <div className="wrapper">
          <div className="login-title">
            <h1>LogIn to your account</h1>
          </div>
          <div className="username-container">
            <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off' />
          </div>
          <div className="password-container">
            <div className="password-field">
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
              <button onClick={handleClick}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="white-icon" /></button>
              <Toaster />
            </div>
          </div>
          <div className="page-button">
            <button className="login-button" onClick={handleLogin}>LogIn</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login