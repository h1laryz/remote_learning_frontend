// import React, { useState } from 'react';
// import VerticalCircleList from './List/VerticalCircleList';
// import Chat from './Chat';
// import './ChatPage.css';

// const ChatPage = ({ chats }) => {
//   const [selectedChat, setSelectedChat] = useState(null);

//   const handleChatSelect = (chat) => {
//     setSelectedChat(chat);
//   };

//   return (
//     <div className="chat-page-container">
//       <div className="sidebar">
//         <VerticalCircleList chats={chats} onChatSelect={handleChatSelect} />
//       </div>
//       <div className="main-content">
//         {selectedChat ? <Chat chatData={selectedChat} /> : <div className="empty-chat">Выберите чат</div>}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useState } from 'react';
import VerticalCircleList from './List/VerticalCircleList';
import Chat from './Chat';
import './ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Хардкодированные данные чатов
  const chatsData = [
    {
      name: "Chat 1",
      backgroundColor: "#ff7f0e",
      participants: [
        { avatar: "avatar1.jpg", nickname: "User 1" },
        { avatar: "avatar2.jpg", nickname: "User 2" },
        { avatar: "avatar3.jpg", nickname: "User 3" }
      ],
      messages: [
        { sender: "User 1", text: "Hello!", timestamp: "10:00 AM" },
        { sender: "User 2", text: "Hi there!", timestamp: "10:05 AM" },
        { sender: "User 1", text: "How are you?", timestamp: "10:10 AM" },
      ]
    },
    {
      name: "Chat 2",
      backgroundColor: "#2ca02c",
      participants: [
        { avatar: "avatar4.jpg", nickname: "User 4" },
        { avatar: "avatar5.jpg", nickname: "User 5" }
      ],
      messages: [
        { sender: "User 4", text: "Hey!", timestamp: "11:00 AM" },
        { sender: "User 5", text: "Hi!", timestamp: "11:05 AM" },
      ]
    }
  ];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chat-page-container">
      <div className="sidebar">
        <VerticalCircleList chats={chatsData} onChatSelect={handleChatSelect} />
      </div>
      <div className="main-content">
        {selectedChat ? <Chat chatData={selectedChat} /> : <div className="empty-chat">Выберите чат</div>}
      </div>
    </div>
  );
};

export default ChatPage;
