import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useJwt } from "react-jwt";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Navigation from '../navigation/Navigation';
import { Helmet } from 'react-helmet';
import './ChatPage.css';

const ChatPage = () => {
  const { t, i18n } = useTranslation();
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatsAvailable, setChatsAvailable] = useState(false);
  const { decodedToken } = useJwt(localStorage.getItem('jwtToken'));

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/v1/subject_groups`, {
          headers: { Authorization: jwtToken }
        });
        console.log('Chat list response:', JSON.stringify(response));
        if (response && !response.data)
        {
          setChatsAvailable(false);
        }
        setChatList(response.data);
        setChatsAvailable(true);
      } catch (error) {
        console.error('Error fetching chat list:', error);
        setChatsAvailable(false);
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
          const response = await axios.get(`http://localhost:8080/v1/chat/messages/${activeChat}`, {
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
      await axios.post(`http://localhost:8080/v1/chat/send_message`, {
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
    <div>
      <Helmet>
        <title>{t("nameOfProject")} | {t("chat")}</title>
      </Helmet>

      <Navigation jwtToken={localStorage.getItem('jwtToken')} />
      <div className="container-fluid chat-page">
        <div className="row">
          <div className="col-md-3 chat-panel">
            {chatsAvailable && chatList.length > 0 ? (
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
              <div>{t('noChatsYet')}</div>
            )}
          </div>
          <div className="col-md-9 chat-area">
            <div className="messages">
              {!activeChat && chatsAvailable && <div className="hello-world">{t('helloWorldChat')}</div>}
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
                  placeholder={t("chatTypeMsg")}
                  className="form-control"
                />
                <button onClick={sendMessage} className="btn btn-primary">{t('chatSend')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
