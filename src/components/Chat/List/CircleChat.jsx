import React from 'react';
import './CircleChat.css';

const CircleChat = ({ chatName, backgroundColor }) => {
  return (
    <div className="circle" style={{ backgroundColor: backgroundColor }}>
      <div className="chat-name">{chatName}</div>
    </div>
  );
};

export default CircleChat;
