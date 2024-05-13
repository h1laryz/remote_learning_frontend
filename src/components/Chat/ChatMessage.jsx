import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  return (
    <div className="message-container">
      <div className="message-sender">
        <img src={message.sender.avatar} alt="Avatar" className="avatar" />
        <span className="sender-nickname">{message.sender.nickname}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default ChatMessage;
