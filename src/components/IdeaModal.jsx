import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import './IdeaModal.css';

export default function IdeaModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'web',
    idea: '',
    stage: 'concept'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      platform: 'web',
      idea: '',
      stage: 'concept'
    });
    onClose();
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} id="idea-modal-overlay">
      <div 
        className="modal-card animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="modal-header">
              <div className="modal-badge">
                <Sparkles size={16} />
                <span>Zero Technical Specs Required</span>
              </div>
              <h3 className="modal-title" id="modal-title">Bring Your App Idea to Life</h3>
              <p className="modal-subtitle">
                Share what you're thinking. We'll help you map out the user flow and clickable prototype.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="user-name">Your Name</label>
                <input 
                  type="text" 
                  id="user-name" 
                  required 
                  placeholder="e.g. Alex Pratama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">Email or WhatsApp</label>
                <input 
                  type="text" 
                  id="user-email" 
                  required 
                  placeholder="alex@company.com or +62 812..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Platform Target</label>
                <div className="platform-radio-group">
                  {[
                    { id: 'web', label: 'Web App' },
                    { id: 'mobile', label: 'Mobile App' },
                    { id: 'desktop', label: 'Desktop App' },
                    { id: 'ai', label: 'AI Agent' }
                  ].map((p) => (
                    <label 
                      key={p.id} 
                      className={`platform-chip ${formData.platform === p.id ? 'active' : ''}`}
                    >
                      <input 
                        type="radio" 
                        name="platform" 
                        value={p.id} 
                        checked={formData.platform === p.id}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="sr-only"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="user-idea">Rough Idea / Problem to Solve</label>
                <textarea 
                  id="user-idea" 
                  rows={4} 
                  required
                  placeholder="What is your app about? Who will use it? Don't worry about complete specs—rough thoughts are perfect!"
                  value={formData.idea}
                  onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary modal-submit-btn">
                <span>Submit Idea for Free Review</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div className="modal-success-state text-center">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3>Idea Received!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. Our product design team will review your notes and contact you at <strong>{formData.email}</strong> within 24 hours to schedule an initial consultation.
            </p>
            <button onClick={handleReset} className="btn btn-primary" style={{ marginTop: '20px' }}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
