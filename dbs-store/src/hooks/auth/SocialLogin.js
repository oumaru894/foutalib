import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from './firebaseConfig';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './SocialLogin.css';
import axios from 'axios';
import { loginURL } from '../../components/assets/constants/Urls/Url';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      if (idToken) {
        const response = await axios.post(loginURL, { idToken }, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.data && response.data.user) {
          localStorage.setItem(`user_${response.data.user.id}`, JSON.stringify(response.data.user));
          localStorage.setItem('id', JSON.stringify(response.data.user.id));
        }
      }


      navigate('/'); // Redirect after login
    } catch (error) {
      //console.error("Error with social login: ", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setFormError("Both email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(loginURL, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        localStorage.setItem(`user_${response.data.user.id}`, JSON.stringify(response.data.user));
        localStorage.setItem('id', JSON.stringify(response.data.user.id));

        //console.log('localStorage',JSON.parse(localStorage.getItem('id',)))

        navigate('/');
      } else {
        setFormError("Invalid email or password.");
      }
    } catch (error) {
      //console.error("Error with manual login: ", error);
      setFormError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Login to FoutaLib</h2>

        {isLoading ? (
          <p>Logging in...</p>
        ) : (
          <div>
            <button
              className="btn btn-danger btn-block mb-3"
              onClick={() => handleSocialLogin(googleProvider)}
            >
              <i className="fab fa-google me-2"></i> Login with Google
            </button>
            <button
              className="btn btn-primary btn-block mb-3"
              onClick={() => handleSocialLogin(facebookProvider)}
            >
              <i className="fab fa-facebook-f me-2"></i> Login with Facebook
            </button>

            <form onSubmit={handleFormLogin} className="mb-3">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {formError && <p className="text-danger">{formError}</p>}
              <button type="submit" className="btn btn-success btn-block mb-2">Login</button>
            </form>

            <button
              className="btn btn-secondary btn-block"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLogin;
