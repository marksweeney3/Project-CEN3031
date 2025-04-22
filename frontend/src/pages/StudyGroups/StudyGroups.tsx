import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateGroupTab from "./CreateGroupTab";
import MyGroupsTab from "./MyGroupsTab";
import SearchGroupsTab from "./SearchGroupsTab";
import styles from "./StudyGroups.module.css";

function StudyGroups() {
    const [activeTab, setActiveTab] = useState<"create" | "my" | "search">("my");
    const navigate = useNavigate();

    // main study groups page with tabs they can navigate between
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Study Groups</h1>

            <div className={styles.tabBar}>
                <button
                    onClick={() => setActiveTab("my")}
                    className={activeTab === "my" ? styles.activeTab : styles.tab}
                >
                    My Groups
                </button>
                <button
                    onClick={() => setActiveTab("search")}
                    className={activeTab === "search" ? styles.activeTab : styles.tab}
                >
                    Search Groups
                </button>
                <button
                    onClick={() => setActiveTab("create")}
                    className={activeTab === "create" ? styles.activeTab : styles.tab}
                >
                    Create Group
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === "my" && <MyGroupsTab />}
                {activeTab === "search" && <SearchGroupsTab />}
                {activeTab === "create" && <CreateGroupTab />}
            </div>

            <button onClick={() => navigate("/home")} className={styles.returnButton}>
                ← Return Home
            </button>

        </div>
    );
}

export default StudyGroups;
