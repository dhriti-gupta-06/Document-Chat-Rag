import { useState } from "react";
import { SendHorizontal } from "lucide-react";

function ChatInput({ onSend }) {
  const [question, setQuestion] = useState("");

  const send = () => {
    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  };

  return (
    <div className="border-t border-gray-700 p-5 flex gap-4 bg-[#111827]">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
        placeholder="Ask anything about this document..."
        className="flex-1 rounded-xl bg-[#1F2937] p-4 outline-none"
      />

      <button
        onClick={send}
        className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
      >
        <SendHorizontal />
      </button>
    </div>
  );
}

export default ChatInput;