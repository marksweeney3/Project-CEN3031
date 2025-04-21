import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

function Profile() {
    const [profile, setProfile] = useState({
        email: "",
        name: "",
        year: "",
        preferences: "",
        favoriteClass: "",
        major: "",
    });

    const [message, setMessage] = useState("");
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

        if (userId) fetchProfile();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/update-profile", {
                userId,
                year: profile.year,
                preferences: profile.preferences,
                favoriteClass: profile.favoriteClass,
                major: profile.major,
                name: profile.name, // still included for backend
            });
            setMessage("Profile updated!");
        } catch (err) {
            console.error("Update failed", err);
            setMessage("Error updating profile");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
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

                <button type="submit" className={styles.button}>Apply Changes</button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
}

export default Profile;
