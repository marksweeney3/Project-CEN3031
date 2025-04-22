import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [profile, setProfile] = useState({
        email: "",
        name: "",
        year: "",
        preferences: "",
        favoriteClass: "",
        major: "",
    });

    const [classes, setClasses] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/profile/${userId}`);
                setProfile(res.data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            }
        };

        const fetchClasses = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/classes/${userId}`);
                setClasses(res.data.map((c: { course_code: string }) => c.course_code));
            } catch (err) {
                console.error("Failed to fetch classes", err);
            }
        };

        if (userId) {
            fetchProfile();
            fetchClasses();
        }
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:5001/update-profile", {
                userId,
                ...profile,
            });
            setMessage("Profile updated!");
        } catch (err) {
            console.error("Failed to update profile", err);
            setMessage("Error updating profile");
        }
    };

    const handleRemoveClass = async (courseCode: string) => {
        try {
            await axios.post("http://localhost:5001/classes/remove", {
                user_id: userId,
                course_code: courseCode,
            });
            setClasses((prev) => prev.filter((code) => code !== courseCode));
        } catch (err) {
            console.error("Failed to remove class", err);
        }
    };

    // user can't update their name or email, but can edit the other information
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <h2 className={styles.title}>Your Profile</h2>

                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                    className={`${styles.input} ${styles.readonly}`}
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    readOnly
                    className={`${styles.input} ${styles.readonly}`}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Year (e.g. Freshman)"
                    value={profile.year}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="preferences"
                    placeholder="Study Preferences (online/in person)"
                    value={profile.preferences}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="favoriteClass"
                    placeholder="Favorite Class"
                    value={profile.favoriteClass}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="major"
                    placeholder="Major"
                    value={profile.major}
                    onChange={handleChange}
                    className={styles.input}
                />

                <button type="button" onClick={handleSave} className={styles.saveButton}>
                    Save Changes
                </button>
                {message && <p className={styles.message}>{message}</p>}

                <h3 className={styles.subtitle}>Your Classes</h3>
                <ul className={styles.classList}>
                    {classes.map((course) => (
                        <li key={course} className={styles.classItem}>
                            {course}
                            <button
                                className={styles.removeButton}
                                onClick={() => handleRemoveClass(course)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </form>

            <button onClick={() => navigate("/home")} className={styles.returnButton}>
                ← Return Home
            </button>
        </div>
    );
}

export default Profile;
