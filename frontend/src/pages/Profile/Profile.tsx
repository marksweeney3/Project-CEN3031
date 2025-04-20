import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

function Profile() {
    const [form, setForm] = useState({
        name: "",
        year: "",
        preferences: "",
        favoriteClass: "",
        major: "",
        email: "",
    });

    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/profile/${userId}`);
                setForm(res.data); // Fills all fields including email
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5001/update-profile", {
                userId,
                name: form.name,
                year: form.year,
                preferences: form.preferences,
                favoriteClass: form.favoriteClass,
                major: form.major,
            });

            setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setMessage("Failed to update profile");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Your Profile</h2>

                {/* Read-only email display */}
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    readOnly
                    className={styles.input}
                    placeholder="Email"
                    style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Year (e.g. Sophomore)"
                    value={form.year}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="preferences"
                    placeholder="Study Preferences (online/in person)"
                    value={form.preferences}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="favoriteClass"
                    placeholder="Favorite Class"
                    value={form.favoriteClass}
                    onChange={handleChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="major"
                    placeholder="Major"
                    value={form.major}
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
