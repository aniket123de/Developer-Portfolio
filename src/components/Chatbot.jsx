import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey there! I'm Aniket's AI assistant. How can I help you today? 😊",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-pro"  // Correct model name
  });

  // Initialize chat on component mount
  useEffect(() => {
    const initChat = async () => {
      try {
        console.log('Starting chat initialization...');
        
        // Verify API key
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          throw new Error('API key is missing');
        }

        // Test the API connection first
        const testResult = await model.generateContent('Test connection');
        console.log('API connection test successful', testResult);

        // Initialize chat
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: "You are Aniket's AI assistant. You should respond as if you are Aniket, a passionate developer who loves building cool stuff with code. You're into web development, especially React and Three.js, and love creating interactive experiences. You're a tech enthusiast who enjoys solving problems and learning new things every day. Your responses should be friendly, enthusiastic, and include relevant emojis. Keep your answers concise but informative." }]
            }
          ]
        });
        
        chatRef.current = chat;
        setIsInitialized(true);
        console.log('Chat initialized successfully');
        
      } catch (error) {
        console.error('Initialization error:', error);
        setMessages(prev => [...prev, { 
          text: `Initialization error: ${error.message}. Please check the console for details.`, 
          sender: 'bot' 
        }]);
      }
    };

    initChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping || !isInitialized || !chatRef.current) return;

    // Add user message
    const userMessage = inputMessage;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('Sending message to Gemini...');
      
      // Send message with timeout
      const result = await Promise.race([
        chatRef.current.sendMessage(userMessage),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )]);
      
      const response = await result;
      const text = await response.text();
      console.log('Received response:', text);

      // Add bot response
      setMessages(prev => [...prev, { text, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = "Oops! I'm having trouble responding. Please try again later! 😅";
      
      if (error.message.includes('timeout')) {
        errorMessage = "The request took too long. Please try again! ⏳";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      setMessages(prev => [...prev, { 
        text: errorMessage, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-[#915EFF] text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-24 right-8 w-80 h-96 bg-black-100 rounded-lg shadow-xl overflow-hidden flex flex-col z-50"
          >
            {/* Chat Header */}
            <div className="bg-[#915EFF] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold">Aniket's AI Assistant</h3>
              {!isInitialized && (
                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">Initializing...</span>
              )}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#915EFF] text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={isInitialized ? "Type your message..." : "Initializing chat..."}
                  className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#915EFF]"
                  disabled={isTyping || !isInitialized}
                />
                <button
                  type="submit"
                  className="bg-[#915EFF] text-white p-2 rounded-lg hover:bg-[#7a4fd4] transition-colors disabled:opacity-50"
                  disabled={isTyping || !isInitialized}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;