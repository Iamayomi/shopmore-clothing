import { useEffect, useRef } from "react";
import "./message.style.scss";

const Message = ({ type, message, onClose }) => {
  const popupRef = useRef(null);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Focus popup for accessibility
  useEffect(() => {
    popupRef.current?.focus();
  }, []);

  return (
    <div className={`message ${type}`} role="alert" tabIndex={-1} ref={popupRef}>
      <div className="content">
        <span className="icon">{type === "success" ? "✔" : "❌"}</span>
        <p className="text">{message}</p>
        <button className="close" onClick={onClose} aria-label="Close popup">
          ×
        </button>
      </div>
    </div>
  );
};

export default Message;
