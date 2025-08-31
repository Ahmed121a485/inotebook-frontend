import React, { useEffect, useState } from 'react';
import './Alert.css';

const Alert = ({ alert }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert && alert.message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!alert || !alert.message || !visible) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'danger': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  };

  return (
    <div className={`custom-alert alert-${alert.type}`}>
      <span className="alert-icon">{getIcon(alert.type)}</span>
      <span className="alert-text">{alert.message}</span>
    </div>
  );
};

export default Alert;
