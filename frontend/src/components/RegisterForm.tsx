import { useState } from "react";
import axios from "axios";

function RegisterForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic front-end validation
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
                password: form.password
            });

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
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <input
                    name="name"
                    type="text"
                    placeholder="First and Last Name"
                    onChange={handleChange}
                    value={form.name}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email (ufl.edu)"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={form.confirmPassword}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>

                {message && <p className="text-center text-red-600 mt-4">{message}</p>}
            </form>
        </div>
    );
}

export default RegisterForm;