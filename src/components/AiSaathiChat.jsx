import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, MessageSquare, Volume2, Lightbulb } from 'lucide-react';
import { prebuiltAiDoubtAnswers, getLocalized, translations, supportedLanguages } from '../data/mockData';

export function AiSaathiChat({ isOpen, onClose, lang, onSpeakText }) {
  const t = translations[lang] || translations['en'];
  const langConfig = supportedLanguages.find(l => l.code === lang);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'en' 
        ? "Hello Rohan! I am your 'Gyan Saathi' AI Tutor. Ask me any doubt in Math or Science, and I will explain with simple village & real-world examples."
        : `नमस्ते रोहन! मैं आपका 'ज्ञान साथी' AI ट्यूटर हूँ। गणित या विज्ञान में कोई भी सवाल पूछें, मैं सरल भाषा और गांव के उदाहरणों के साथ समझाऊंगा।`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "What are Fractions? (Roti analogy)",
    "How does Photosynthesis work?",
    "Why do we need Percentages?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matched = prebuiltAiDoubtAnswers.find(item => 
        item.triggerWords.some(w => qLower.includes(w))
      );

      let reply = "";
      if (matched) {
        reply = getLocalized(matched.response, lang);
      } else {
        reply = lang === 'en'
          ? `Great question! To understand "${query}", remember that math and science reflect our natural surroundings—like water flow in irrigation channels or counting sacks of harvest in the village market. Try listening to the audio summary for this chapter!`
          : `शानदार सवाल! "${query}" को समझने के लिए याद रखें: विज्ञान और गणित हमारे आसपास के वातावरण से जुड़े हैं। जैसे खेती में पानी का प्रवाह या हाट-बाजार में हिसाब-किताब।`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col h-[85vh] sm:h-[520px] max-h-[600px] animate-slideUp">
      {/* Header */}
      <div className="bg-upnavy-900 text-white p-4 px-5 flex items-center justify-between shadow-xs border-b border-upnavy-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-upsaffron-500/20 border border-upsaffron-400/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-upsaffron-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2">
              <span>Gyan Saathi AI</span>
              <span className="text-[10px] bg-upsaffron-500/20 border border-upsaffron-400/30 px-2 py-0.5 rounded-full text-upsaffron-200 font-semibold">
                Rural AI Tutor
              </span>
            </h3>
            <p className="text-[11px] text-slate-300">
              Vernacular explanations & relatable village analogies
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-300 hover:text-white p-1 rounded-xl hover:bg-upnavy-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
        {messages.map((m, idx) => (
          <div 
            key={idx}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'bot' && (
              <div className="w-7 h-7 rounded-xl bg-upnavy-800 text-upsaffron-400 border border-upnavy-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-black shadow-xs">
                AI
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-upnavy-950 text-white rounded-tr-xs'
                : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
            }`}>
              <p className="whitespace-pre-line">{m.text}</p>
              {m.sender === 'bot' && (
                <button
                  onClick={() => onSpeakText(m.text)}
                  className="mt-2.5 text-[10px] text-upnavy-900 hover:text-upsaffron-600 font-bold flex items-center gap-1.5 bg-upnavy-50 px-2.5 py-1 rounded-lg border border-upnavy-200 transition"
                >
                  <Volume2 className="w-3 h-3 text-upsaffron-600" />
                  <span>Listen Out Loud</span>
                </button>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic pl-9">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-upsaffron-500 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-upsaffron-500 animate-pulse delay-75" />
              <span className="w-1.5 h-1.5 rounded-full bg-upsaffron-500 animate-pulse delay-150" />
            </span>
            <span>Saathi is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask any doubt (e.g. What are fractions?)..."
          className="flex-1 text-xs px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 bg-slate-50 focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-2xl bg-upsaffron-600 hover:bg-upsaffron-700 disabled:opacity-30 text-white flex items-center justify-center transition shadow-xs shadow-upsaffron-600/30 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
