import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5001/login", {
                email,
                password,
            });

            setMessage(res.data.message);
            localStorage.setItem("userId", res.data.userId.toString());
            localStorage.setItem("userName", res.data.name);
            navigate("/home");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data?.error || "Login failed";
                setMessage(error);
            } else {
                setMessage("Unexpected error");
            }
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Welcome back to GatorStudyCentral!</h2>

                <input
                    name="email"
                    type="email"
                    placeholder="Email (ufl.edu)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    LOGIN
                </button>

                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
}

export default Login;