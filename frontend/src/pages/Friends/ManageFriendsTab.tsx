import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Friends.module.css";

interface Friend {
    id: number;
    name: string;
    email: string;
}

function ManageFriendsTab() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const userId = localStorage.getItem("userId");

    const fetchFriends = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/friends/${userId}`);
            const sorted = res.data.sort((a: Friend, b: Friend) => a.name.localeCompare(b.name));
            setFriends(sorted);
        } catch (err) {
            console.error("Failed to fetch friends", err);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [userId]);

    const handleRemove = async (friendId: number) => {
        try {
            await axios.post("http://localhost:5001/friends/remove", {
                user_id: userId,
                friend_id: friendId,
            });
            setFriends((prev) => prev.filter((f) => f.id !== friendId));
        } catch (err) {
            console.error("Failed to remove friend", err);
        }
    };

    return (
        <div className={styles.list}>
            {friends.length === 0 ? (
                <p>You have no friends yet.</p>
            ) : (
                friends.map((friend) => (
                    <div key={friend.id} className={styles.card}>
                        <h3>{friend.name}</h3>
                        <p>{friend.email}</p>
                        <button className={styles.removeButton} onClick={() => handleRemove(friend.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageFriendsTab;
