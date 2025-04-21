import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StudySessions.module.css";

interface Group {
    id: number;
    name: string;
}

function CreateSessionTab() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [message, setMessage] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/groups/my-groups/${userId}`);
                setGroups(res.data);
            } catch (err) {
                console.error("Failed to fetch study groups", err);
            }
        };

        if (userId) fetchGroups();
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            location: formData.get("location"),
            date_time: formData.get("date_time"),
            description: formData.get("description"),
            group_id: Number(formData.get("group_id")),
            creator_id: userId,
        };


        try {
            await axios.post("http://localhost:5001/sessions/create", data);
            setMessage("Study session created!");
        } catch (error) {
            console.error("Failed to create session", error);
            setMessage("Error creating session");
        }
    };

    return (
        <div>
            <h2 className={styles.sectionTitle}>Create a New Study Session</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <select name="group_id" required className={styles.input}>
                    <option value="">Select a study group</option>
                    {groups.map((g) => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>
                <input name="name" placeholder="Session Name" required className={styles.input}/>
                <input name="location" placeholder="Location (e.g. Library West Room 201)" required
                       className={styles.input}/>
                <input name="date_time" type="datetime-local" required className={styles.input}/>
                <textarea name="description" placeholder="Description" rows={3} className={styles.textarea}/>

                <button type="submit" className={styles.button}>Create Session</button>
            </form>

            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default CreateSessionTab;
