import React, { useState, ChangeEvent, FormEvent } from 'react';
import './RegisterPage.css';

interface RegisterFormProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterFormProps> = ({ onNavigateToLogin, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('請填寫所有欄位。');
      return;
    }
    if (password !== confirmPassword) {
      setError('兩次輸入的密碼不相符。');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('請輸入有效的電郵地址。');
        return;
    }
    if (password.length < 6) {
        setError('密碼長度至少需要6位。');
        return;
    }
    console.log('Register attempt:', { name, email, password });
    alert('註冊成功！請登入。');
    onRegisterSuccess();
  };

  return (
    <div className="register-page-container">
      <div className="register-form-wrapper">
        <h2>註冊新賬號</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="請輸入你的姓名"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="請輸入你的密碼 (至少6位)"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">確認密碼</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="請再次輸入你的密碼"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-submit-btn">
            註冊
          </button>
          <div className="register-links">
            <span onClick={onNavigateToLogin} className="login-link-from-register">
              已有賬號? <span className="login-link-action">立刻登入</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;