import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateSessionTab from "./CreateSessionTab";
import MySessionsTab from "./MySessionsTab";
import styles from "./StudySessions.module.css";

function StudySessions() {
    const [activeTab, setActiveTab] = useState<"my" | "create">("my");
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.tabBar}>
                <button
                    onClick={() => setActiveTab("my")}
                    className={activeTab === "my" ? styles.activeTab : styles.tab}
                >
                    My Sessions
                </button>
                <button
                    onClick={() => setActiveTab("create")}
                    className={activeTab === "create" ? styles.activeTab : styles.tab}
                >
                    Create Session
                </button>
            </div>

            <button onClick={() => navigate("/home")} className={styles.returnButton}>
                ← Return Home
            </button>

            {activeTab === "my" ? <MySessionsTab/> : <CreateSessionTab/>}
        </div>
    );
}

export default StudySessions;
