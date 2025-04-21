import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

function Home() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src="/uf.png" alt="UF Logo" className={styles.logo} />
                <h1 className={styles.title}>GatorStudyCentral</h1>
                <img src="/gator.png" alt="Gator Logo" className={styles.logo} />
            </div>
            {userName && <p className={styles.welcome}>Welcome, {userName}!</p>}

            <div className={styles.spacer}>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={() => navigate("/study-groups")}>
                        Study Groups
                    </button>
                    <button className={styles.button} onClick={() => navigate("/study-sessions")}>
                        Study Sessions
                    </button>
                    <button className={styles.button} onClick={() => navigate("/uf-classes")}>
                        UF Classes
                    </button>
                    <button className={styles.button} onClick={() => navigate("/profile")}>
                        User Profile
                    </button>
                    <button className={styles.button} onClick={() => navigate("/study-rooms")}>
                        Study Rooms & Libraries
                    </button>
                    <button className={styles.button} onClick={() => navigate("/friends")}>
                        Friends List
                    </button>
                </div>
            </div>

            <p className={styles.footer}>Go Gators!</p>
        </div>
    );
}

export default Home;
