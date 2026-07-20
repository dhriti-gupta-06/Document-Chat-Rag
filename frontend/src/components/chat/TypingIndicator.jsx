import { Loader2 } from "lucide-react";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Loader2 className="animate-spin text-blue-500" size={20} />
      <span className="text-gray-400">
        AI is thinking...
      </span>
    </div>
  );
}

export default TypingIndicator;