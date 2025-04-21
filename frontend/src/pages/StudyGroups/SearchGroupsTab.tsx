import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StudyGroups.module.css";

interface Group {
    id: number;
    name: string;
    course_code: string;
    max_members: number;
    preference: string;
    description: string;
}

function SearchGroupsTab() {
    const [search, setSearch] = useState("");
    const [groups, setGroups] = useState<Group[]>([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get("http://localhost:5001/groups/search", {
                    params: { userId, query: search }
                });
                setGroups(res.data);
            } catch (err) {
                console.error("Failed to search groups", err);
            }
        };

        fetchGroups();
    }, [search, userId]);

    const handleJoin = async (groupId: number) => {
        try {
            await axios.post("http://localhost:5001/groups/join", {
                group_id: groupId,
                user_id: userId,
            });
            setGroups((prev) => prev.filter((g) => g.id !== groupId));
        } catch (err) {
            console.error("Failed to join group", err);
        }
    };

    const extractSubject = (courseCode: string) => courseCode.split("-")[0] || courseCode;

    return (
        <div>
            <input
                type="text"
                placeholder="Search by group name or subject"
                className={styles.searchBar}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.groupList}>
                {groups.map((group) => (
                    <div key={group.id} className={styles.groupCard}>
                        <h3>{group.name}</h3>
                        <p><strong>Subject:</strong> {extractSubject(group.course_code)}</p>
                        <p><strong>Course Code:</strong> {group.course_code}</p>
                        <p><strong>Max Members:</strong> {group.max_members}</p>
                        <p><strong>Description:</strong> {group.description}</p>
                        <button className={styles.joinButton} onClick={() => handleJoin(group.id)}>
                            Join Group
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchGroupsTab;
