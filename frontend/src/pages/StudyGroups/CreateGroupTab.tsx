import { useState } from "react";
import axios from "axios";
import styles from "./StudyGroups.module.css";

function CreateGroupTab() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const data = {
            name: formData.get("name"),
            course_code: `${formData.get("course_subject")}-${formData.get("course_code")}`,
            max_members: parseInt(formData.get("max_members") as string),
            preference: formData.get("preference"),
            description: formData.get("description"),
            creator_id: localStorage.getItem("userId"),
        };

        try {
            await axios.post("http://localhost:5001/groups/create", data);
            setMessage("Group created successfully");
        } catch (error) {
            console.error("Group creation failed", error);
            setMessage("Error creating group");
        }
    };

    // create a group with the required fields
    return (
        <div>
            <h2 className={styles.sectionTitle}>Create a New Study Group</h2>
            <form onSubmit={handleSubmit} className={styles.createGroupForm}>
                <input name="name" placeholder="Group Name" required className={styles.input}/>
                <input name="course_subject" placeholder="Class Subject" required className={styles.input}/>
                <input name="course_code" placeholder="Course Code" required className={styles.input}/>
                <textarea
                    name="description"
                    placeholder="Group Description"
                    rows={3}
                    className={styles.input}
                />
                <input
                    name="max_members"
                    type="number"
                    placeholder="Max Members"
                    required
                    min={1}
                    max={500}
                    className={styles.input}
                />
                <select name="preference" className={styles.input}>
                    <option>Online</option>
                    <option>In Person</option>
                </select>
                <button type="submit" className={styles.button}>Create Group</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
}

export default CreateGroupTab;
