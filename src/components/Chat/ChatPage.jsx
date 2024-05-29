import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useJwt } from "react-jwt";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import './ChatPage.css';

const BASE_URL = 'http://localhost:8080';

const ChatPage = () => {
  const { t, i18n } = useTranslation();
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { decodedToken } = useJwt(localStorage.getItem('jwtToken'));

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

          const processedMessages = response.data.map(message => ({
            ...message,
            timestamp: moment.utc(message.timestamp, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD HH:mm:ss')
          }));

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

  const sendMessage = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      await axios.post(`${BASE_URL}/v1/chat/send_message`, {
        subject_group_name: activeChat,
        content: messageContent
      }, {
        headers: { Authorization: jwtToken }
      });
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container-fluid chat-page">
      <div className="row">
        <div className="col-md-3 chat-panel">
          {loading ? (
            <div>Loading...</div>
          ) : chatList.length > 0 ? (
            chatList.map(chat => (
              <button
                key={chat}
                onClick={() => setActiveChat(chat)}
                className={`btn btn-block ${chat === activeChat ? 'btn-primary active' : 'btn-light'}`}
              >
                {chat}
              </button>
            ))
          ) : (
            <div>No chats yet. Please wait to be added to a subject group.</div>
          )}
        </div>
        <div className="col-md-9 chat-area">
          <div className="messages">
            {!activeChat && <div className="hello-world">{t('helloWorldChat')}</div>}
            {messages && messages.map((message, index) => (
              <div key={index} className={`message ${message.user_id.toString() === decodedToken.user_id ? 'own' : 'other'}`}>
                <div className="message-content">
                  <strong>{message.surname} {message.last_name}</strong><br />
                  {message.content}
                  <div className="message-timestamp">{moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>
              </div>
            ))}
          </div>
          {activeChat && (
            <div className="message-input">
              <input
                type="text"
                value={messageContent}
                onChange={e => setMessageContent(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') sendMessage();
                }}
                placeholder="Type a message..."
                className="form-control"
              />
              <button onClick={sendMessage} className="btn btn-primary">Send</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
