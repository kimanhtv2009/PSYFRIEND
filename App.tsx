
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { getBotResponse } from './services/geminiService';
import { Message, Sender } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Xin chào! Tôi là PsyFriend, trợ lý ảo của bạn. Tôi có thể giúp gì cho bạn hôm nay?',
      sender: Sender.BOT,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { text, sender: Sender.USER };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Call the Gemini API to get the bot's response
      const botText = await getBotResponse(text);
      const botMessage: Message = { text: botText, sender: Sender.BOT };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    // Fix: Renamed the catch block variable from 'error' to 'err' to resolve the "Cannot find name 'error'" issue.
    } catch (err) {
      console.error("Error fetching bot response:", err);
      const errorMessage: Message = {
        text: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
        sender: Sender.BOT,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-900">
      <Header />
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
