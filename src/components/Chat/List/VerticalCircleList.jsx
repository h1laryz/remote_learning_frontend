import React from 'react';
import CircleChat from './CircleChat';
import './VerticalCircleList.css';

const VerticalCircleList = ({ chats, onChatSelect }) => {
  return (
    <div className="vertical-circle-list-container">
      <div className="circle-list">
        {chats.map((chat, index) => (
          <CircleChat
            key={index}
            chatName={chat.name}
            backgroundColor={chat.backgroundColor}
            onClick={() => onChatSelect(chat)} // Добавляем обработчик клика
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCircleList;
