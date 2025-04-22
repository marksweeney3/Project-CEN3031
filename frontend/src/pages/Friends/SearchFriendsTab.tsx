import { useState } from "react";
import axios from "axios";
import styles from "./Friends.module.css";

function SearchFriendsTab() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");

    const handleAddFriend = async () => {
        try {
            await axios.post("http://localhost:5001/friends/add", {
                user_id: userId,
                friend_email: email,
            });
            setMessage("Friend added!");
            setEmail("");
        } catch (err) {
            setMessage("Failed to add friend");
            console.error(err);
        }
    };

    // search by user's ufl.edu email
    return (
        <div className={styles.form}>
            <input
                type="email"
                placeholder="Friend's ufl.edu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleAddFriend} className={styles.button}>REQUEST FRIEND</button>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default SearchFriendsTab;
