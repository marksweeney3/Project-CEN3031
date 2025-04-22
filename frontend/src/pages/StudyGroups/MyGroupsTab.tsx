import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StudyGroups.module.css";
import GroupMessages from "./GroupMessages";

interface Group {
    id: number;
    name: string;
    course_code: string;
    member_count: number;
    description: string;
}

function MyGroupsTab() {
    const [groups, setGroups] = useState<Group[]>([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/groups/my-groups/${userId}`);
                setGroups(res.data);
            } catch (err) {
                console.error("Failed to fetch groups", err);
            }
        };

        if (userId) fetchGroups();
    }, [userId]);

    const handleLeaveGroup = async (groupId: number) => {
        try {
            await axios.post("http://localhost:5001/groups/leave", {
                group_id: groupId,
                user_id: userId,
            });
            setGroups((prev) => prev.filter((g) => g.id !== groupId));
        } catch (err) {
            console.error("Failed to leave group", err);
        }
    };

    // user can see any study groups they are in
    return (
        <div>
            <h2 className={styles.sectionTitle}>My Study Groups</h2>
            {groups.length === 0 ? (
                <p>You are not in any study groups yet.</p>
            ) : (
                <div className={styles.groupList}>
                    {groups.map((group) => (
                        <div key={group.id} className={styles.groupCard}>
                            <h3>{group.name}</h3>
                            <p><strong>Subject:</strong> {group.course_code.split("-")[0]}</p>
                            <p><strong>Course Code:</strong> {group.course_code.split("-")[1]}</p>
                            <p><strong>Description:</strong> {group.description}</p>
                            <GroupMessages groupId={group.id} />
                            <button
                                className={styles.leaveButton}
                                onClick={() => handleLeaveGroup(group.id)}
                            >
                                Leave Group
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyGroupsTab;
