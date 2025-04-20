import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>GatorStudyCentral</h1>
            <div className={styles.grid}>
                <button onClick={() => navigate("/study-groups")}>Study Groups</button>
                <button onClick={() => navigate("/study-sessions")}>Study Sessions</button>
                <button onClick={() => navigate("/uf-classes")}>UF Classes</button>
                <button onClick={() => navigate("/profile")}>User Profile</button>
                <button onClick={() => navigate("/study-rooms")}>Study Rooms & Libraries</button>
                <button onClick={() => navigate("/friends")}>Friends List</button>
            </div>
            <p className={styles.footer}>Go Gators!</p>
        </div>
    );
}

export default Home;
