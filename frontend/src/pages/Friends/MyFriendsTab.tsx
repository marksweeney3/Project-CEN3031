import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Friends.module.css";

interface Friend {
    id: number;
    name: string;
    email: string;
}

function MyFriendsTab() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/friends/${userId}`);
                const sorted = res.data.sort((a: Friend, b: Friend) => a.name.localeCompare(b.name));
                setFriends(sorted);
            } catch (err) {
                console.error("Failed to fetch friends", err);
            }
        };

        fetchFriends();
    }, [userId]);

    return (
        <div className={styles.list}>
            {friends.length === 0 ? (
                <p>You have no friends yet.</p>
            ) : (
                friends.map((friend) => (
                    <div key={friend.id} className={styles.card}>
                        <h3>{friend.name}</h3>
                        <p>{friend.email}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyFriendsTab;
