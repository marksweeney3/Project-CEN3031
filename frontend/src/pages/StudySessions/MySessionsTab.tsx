import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StudySessions.module.css";

interface Session {
    id: number;
    name: string;
    location: string;
    date_time: string;
    description: string;
    group_name: string;
    course_code: string;
}

function MySessionsTab() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/sessions/my/${userId}`);
                setSessions(res.data);
            } catch (err) {
                console.error("Failed to fetch study sessions", err);
            }
        };

        if (userId) fetchSessions();
    }, [userId]);

    // user can see the upcoming study sessions and information with it
    return (
        <div>
            <h2 className={styles.sectionTitle}>My Upcoming Study Sessions</h2>
            {sessions.length === 0 ? (
                <p>No upcoming study sessions</p>
            ) : (
                <div className={styles.sessionList}>
                    {sessions.map((session) => (
                        <div key={session.id} className={styles.sessionCard}>
                            <h3>{session.name}</h3>
                            <p><strong>Group:</strong> {session.group_name}</p>
                            <p><strong>Subject:</strong> {session.course_code.split("-")[0]}</p>
                            <p><strong>Course Code:</strong> {session.course_code.split("-")[1]}</p>
                            <p><strong>Location:</strong> {session.location}</p>
                            <p><strong>Time:</strong> {new Date(session.date_time).toLocaleString()}</p>
                            <p><strong>Description:</strong> {session.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MySessionsTab;
