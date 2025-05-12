import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginPage.css';

interface LoginFormProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginFormProps> = ({ onNavigateToRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('請輸入電郵和密碼。');
      return;
    }
    console.log('Login attempt:', { email, password });
    if (email === "user@example.com" && password === "password123") {
      alert('登入成功！');
      onLoginSuccess();
    } else {
      setError('電郵或密碼錯誤。');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2>登入</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">電郵</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="請輸入你的電郵"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="請輸入你的密碼"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit-btn">
            登入
          </button>
          <div className="login-links">
            <a href="#forgot-password" onClick={(e)=> e.preventDefault()} className="forgot-password-link">忘記密碼?</a>
            <span onClick={onNavigateToRegister} className="register-link">
              沒有賬號? <span className="register-link-action">立刻點擊註冊</span>
            </span>
          </div>
        </form>
        <div className="social-login-divider">
          <span>或者用以下方式登入</span>
        </div>
        <div className="social-login-options">
          <button className="social-login-btn phone-login">
            <span className="social-icon phone-icon">📞</span>
            電話
          </button>
          <button className="social-login-btn facebook-login">
            <span className="social-icon facebook-icon-login">f</span>
            FaceBook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;