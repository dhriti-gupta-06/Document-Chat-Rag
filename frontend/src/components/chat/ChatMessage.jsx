import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

function ChatMessage({ role, message }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl p-5 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-[#1F2937] border border-gray-700"
        }`}
      >
        <div className="flex items-center gap-2 mb-3 font-semibold">
          {isUser ? <User size={18} /> : <Bot size={18} />}
          {isUser ? "You" : "AI"}
        </div>

        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;