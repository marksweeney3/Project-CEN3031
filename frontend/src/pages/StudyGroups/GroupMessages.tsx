import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GroupMessages.module.css";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

interface Props {
    groupId: number;
}

function GroupMessages({ groupId }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMessages, setShowMessages] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/groups/messages/${groupId}`);
                setMessages(res.data);
            } catch (err) {
                console.error("Failed to load messages", err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [groupId]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            await axios.post("http://localhost:5001/messages/send", {
                group_id: groupId,
                sender_id: userId,
                content: newMessage,
            });
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    const formatLocalTime = (utcTimestamp: string) => {
        try {
            const utcDate = new Date(utcTimestamp);
            const adjustedDate = new Date(utcDate.getTime() - 4 * 60 * 60 * 1000);
            return adjustedDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        } catch {
            return "Invalid Date";
        }
    };

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => setShowMessages(!showMessages)}
                className={styles.toggleButton}
            >
                {showMessages ? "Hide Messages" : "Show Messages"}
            </button>

            {showMessages && (
                <div className={styles.messageBoard}>
                    <h3 className={styles.heading}>Group Messages</h3>
                    <div className={styles.messageList}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={styles.message}>
                                <strong>{msg.sender}</strong>{" "}
                                <span className={styles.time}>
                                    {msg.timestamp ? formatLocalTime(msg.timestamp) : "No Time"}
                                </span>
                                <p>{msg.content}</p>
                            </div>
                        ))}
                    </div>
                    <textarea
                        className={styles.textarea}
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSend} className={styles.sendButton}>
                        Send
                    </button>
                </div>
            )}
        </div>
    );
}

export default GroupMessages;
