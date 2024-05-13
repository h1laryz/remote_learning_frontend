import React from 'react';
import ChatMessage from './ChatMessage';
import './Chat.css';

const Chat = ({ chatData }) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-participants">
          {chatData.participants.map((participant, index) => (
            <div key={index} className="participant">
              <img src={participant.avatar} alt="Avatar" className="avatar" />
              <span className="nickname">{participant.nickname}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-messages">
        {chatData.messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
