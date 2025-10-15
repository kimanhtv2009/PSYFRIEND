import React, { useState } from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { Message, Sender } from './types';
import { getBotResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Xin chào! Tôi là PsyFriend, trợ lý AI của bạn. Tôi có thể giúp gì cho bạn hôm nay?',
      sender: Sender.BOT,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { text, sender: Sender.USER };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(text);
      const botMessage: Message = { text: botResponseText, sender: Sender.BOT };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
      const errorMessageObj: Message = { text: `Lỗi: ${errorMessage}`, sender: Sender.BOT };
      setMessages((prevMessages) => [...prevMessages, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
