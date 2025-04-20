import { useState } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.css";

function RegisterForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email.endsWith("@ufl.edu")) {
            setMessage("Email must end with @ufl.edu");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5001/register", {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            localStorage.setItem("userName", form.name);
            setMessage(res.data.message);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const error = err.response?.data?.error || "Something went wrong";
                const detail = err.response?.data?.details;
                setMessage(`${error}${detail ? ": " + detail : ""}`);
            } else {
                setMessage("An unexpected error occurred");
            }
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Welcome to GatorStudyCentral!</h2>
                <p className={styles.subtitle}>User Registration</p>

                <input
                    name="name"
                    type="text"
                    placeholder="Name (first and last)"
                    onChange={handleChange}
                    value={form.name}
                    required
                    className={styles.input}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email (ufl.edu)"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className={styles.input}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className={styles.input}
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={form.confirmPassword}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Register
                </button>

                <div className={styles.loginRedirect}>
                    Already have an account?
                    <a href="/login">Login</a>
                </div>

                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
}

export default RegisterForm;