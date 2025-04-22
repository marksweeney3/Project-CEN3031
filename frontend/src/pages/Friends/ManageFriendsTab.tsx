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
    const [requests, setRequests] = useState<Friend[]>([]);
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

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/friends/requests/${userId}`);
            setRequests(res.data);
        } catch (err) {
            console.error("Failed to fetch requests", err);
        }
    };

    useEffect(() => {
        fetchFriends();
        fetchRequests();
    }, [userId]);

    // remove a friend
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

    // accept a friend request
    const handleAccept = async (friendId: number) => {
        try {
            await axios.post("http://localhost:5001/friends/accept", {
                user_id: userId,
                friend_id: friendId,
            });
            const acceptedFriend = requests.find((r) => r.id === friendId);
            if (acceptedFriend) {
                setFriends((prev) => [...prev, acceptedFriend].sort((a, b) => a.name.localeCompare(b.name)));
                setRequests((prev) => prev.filter((r) => r.id !== friendId));
            }
        } catch (err) {
            console.error("Failed to accept friend request", err);
        }
    };

    return (
        <div className={styles.list}>
            <h3>Pending Friend Requests</h3>
            {requests.length === 0 ? (
                <p>No pending friend requests.</p>
            ) : (
                requests.map((req) => (
                    <div key={req.id} className={styles.card}>
                        <h3>{req.name}</h3>
                        <p>{req.email}</p>
                        <button className={styles.button} onClick={() => handleAccept(req.id)}>
                            Accept
                        </button>
                    </div>
                ))
            )}

            <h3 style={{ marginTop: "2rem" }}>Your Friends</h3>
            {friends.length === 0 ? (
                <p>You have no friends yet.</p>
            ) : (
                friends.map((friend) => (
                    <div key={friend.id} className={styles.card}>
                        <h3>{friend.name}</h3>
                        <p>{friend.email}</p>
                        <button className={styles.removeButton} onClick={() => handleRemove(friend.id)}>
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageFriendsTab;
