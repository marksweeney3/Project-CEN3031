import { useState } from "react";
import axios from "axios";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">
                    Welcome to GatorStudyCentral!
                </h2>
                <p className="text-center text-red-500 mb-6">
                    User Registration
                </p>

                <input
                    name="name"
                    type="text"
                    placeholder="First and Last Name"
                    onChange={handleChange}
                    value={form.name}
                    required
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email (ufl.edu)"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    required
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={form.confirmPassword}
                    required
                    className="mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-2 rounded-lg shadow-md"
                >
                    Register
                </button>

                {message && (
                    <p className="text-center text-red-600 mt-4 font-medium">{message}</p>
                )}
            </form>
        </div>
    );
}

export default RegisterForm;
