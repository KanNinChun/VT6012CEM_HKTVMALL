import React, { useState, ChangeEvent, FormEvent } from 'react';
import './FeedbackPage.css';

interface FeedbackFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('請填寫所有欄位。');
      return;
    }
    console.log('Feedback Submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="feedback-page-container">
        <div className="feedback-form-wrapper submitted-message">
          <h2>感謝您的回饋！</h2>
          <p>我們已收到您的意見，並會盡快處理。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page-container">
      <div className="feedback-header-text">
        <h1>回饋意見</h1>
        <p>
          歡迎您填寫以下表格，透過線上對話即時與我們的客戶服務團隊聯絡，
          <br />
          我們很樂意為您解答查詢。
        </p>
      </div>
      <div className="feedback-form-wrapper">
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">聯絡電郵</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">標題</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">給我們的訊息</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>
          <button type="submit" className="submit-feedback-btn">
            發送
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;