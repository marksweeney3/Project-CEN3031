import { useState } from "react";
import SearchFriendsTab from "./SearchFriendsTab";
import MyFriendsTab from "./MyFriendsTab";
import ManageFriendsTab from "./ManageFriendsTab";
import styles from "./Friends.module.css";
import { useNavigate } from "react-router-dom";

function Friends() {
    const [activeTab, setActiveTab] = useState<"my" | "search" | "manage">("my");
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Friends</h1>
            <div className={styles.tabBar}>
                <button onClick={() => setActiveTab("my")}
                        className={activeTab === "my" ? styles.activeTab : styles.tab}>My Friends
                </button>
                <button onClick={() => setActiveTab("search")}
                        className={activeTab === "search" ? styles.activeTab : styles.tab}>Add Friend
                </button>
                <button onClick={() => setActiveTab("manage")}
                        className={activeTab === "manage" ? styles.activeTab : styles.tab}>Manage
                </button>
            </div>
            <div className={styles.tabContent}>
                {activeTab === "my" && <MyFriendsTab/>}
                {activeTab === "search" && <SearchFriendsTab/>}
                {activeTab === "manage" && <ManageFriendsTab/>}
            </div>

            <button onClick={() => navigate("/home")} className={styles.returnButton}>
                ← Return Home
            </button>

        </div>
    );
}

export default Friends;
