import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useJwt } from "react-jwt";
import moment from 'moment';
import './ChatPage.css'

const BASE_URL = 'http://localhost:8080';

const ChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { decodedToken } = useJwt(localStorage.getItem('jwtToken'));

  // Получение списка чатов
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get(`${BASE_URL}/v1/subject_groups`, {
          headers: { Authorization: jwtToken }
        });
        console.log('Chat list response:', JSON.stringify(response));
        setChatList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };

    fetchChatList();
  }, []);

  // Получение сообщений для активного чата
  useEffect(() => {
    let interval;
    if (activeChat) {
      const fetchMessages = async () => {
        try {
          const jwtToken = localStorage.getItem('jwtToken');
          const response = await axios.get(`${BASE_URL}/v1/chat/messages/${activeChat}`, {
            headers: { Authorization: jwtToken }
          });
          console.log('Messages response:', JSON.stringify(response));
          
          // Обработка сообщений и времени
          const processedMessages = response.data.map(message => ({
            ...message,
            timestamp: moment.utc(message.timestamp, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD HH:mm:ss')
          }));
          
          // Сортировка сообщений по времени (новые сверху)
          const sortedMessages = processedMessages.sort((b, a) => moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf());

          setMessages(sortedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      
      fetchMessages();
      interval = setInterval(fetchMessages, 2000);
    } else {
      clearInterval(interval);
      setMessages([]);
    }

    return () => clearInterval(interval);
  }, [activeChat]);

  // Отправка сообщения
  const sendMessage = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await axios.post(`${BASE_URL}/v1/chat/send_message`, {
        subject_group_name: activeChat,
        content: messageContent
      }, {
        headers: { Authorization: jwtToken }
      });
      console.log('Send message response:', JSON.stringify(response));
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-panel">
        {loading ? (
          <div>Loading...</div>
        ) : chatList.length > 0 ? (
          chatList.map(chat => (
            <div key={chat} onClick={() => setActiveChat(chat)} className={`chat-circle ${chat === activeChat ? 'active' : ''}`}>
              {chat}
            </div>
          ))
        ) : (
          <div>No chats yet. Please wait to be added to a subject group.</div>
        )}
      </div>
      <div className="chat-area">
        {activeChat ? (
          <div>
            <h2>{activeChat}</h2>
            <div className="messages">
              {messages && messages.map((message, index) => (
                <div key={index} className={`message ${message.user_id.toString() === decodedToken.user_id ? 'own' : 'other'}`}>
                  <div className="message-info">{moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')}</div>
                  <div className="message-content">
                    {message.surname} {message.last_name}<br />
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={messageContent}
              onChange={e => setMessageContent(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') sendMessage();
              }}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
