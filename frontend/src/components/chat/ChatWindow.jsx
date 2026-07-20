import { useEffect, useRef, useState } from "react";

import api from "../../services/api";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ document }) {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    // Auto Scroll
    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);

    // Load Previous Chat
    useEffect(() => {

        loadHistory();

    }, [document]);

    const loadHistory = async () => {

        try {

            const response = await api.get(
                `/chat-history/${document.id}`
            );

            if (response.data.messages.length > 0) {

                setMessages(response.data.messages);

            }

            else {

                setMessages([
                    {
                        role: "assistant",
                        message:
                            `👋 Hello!\n\nI'm ready to answer questions about **${document.filename}**.`
                    }
                ]);

            }

        }

        catch {

            setMessages([
                {
                    role: "assistant",
                    message:
                        `👋 Hello!\n\nI'm ready to answer questions about **${document.filename}**.`
                }
            ]);

        }

    };

    const sendQuestion = async (question) => {

        if (!question.trim()) return;

        const userMessage = {

            role: "user",

            message: question

        };

        setMessages(prev => [

            ...prev,

            userMessage

        ]);

        setLoading(true);

        try {

            const response = await api.post(
                "/chat",
                {

                    document_id: document.id,

                    question

                }
            );

            const aiMessage = {

                role: "assistant",

                message: response.data.answer

            };

            setMessages(prev => [

                ...prev,

                aiMessage

            ]);

        }

        catch {

            setMessages(prev => [

                ...prev,

                {

                    role: "assistant",

                    message:
                        "❌ Unable to contact the backend."

                }

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex flex-col h-full bg-[#111827] rounded-2xl border border-gray-800">

            {/* Header */}

            <div className="border-b border-gray-700 p-6">

                <h2 className="text-2xl font-bold">

                    {document.filename}

                </h2>

                <p className="text-gray-400">

                    AI Document Chat

                </p>

            </div>

            {/* Chat */}

            <div className="flex-1 overflow-y-auto p-6">

                {

                    messages.map((msg, index) => (

                        <ChatMessage

                            key={index}

                            role={msg.role}

                            message={msg.message}

                        />

                    ))

                }

                {

                    loading && (

                        <TypingIndicator />

                    )

                }

                <div ref={bottomRef} />

            </div>

            {/* Input */}

            <div className="border-t border-gray-700">

                <ChatInput

                    onSend={sendQuestion}

                />

            </div>

        </div>

    );

}

export default ChatWindow;