import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        axios.get("/api")
            .then(res => setMessage(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">MERN Stack App</h1>
            <p className="text-lg text-gray-700">{message}</p>
        </div>
    );
}

export default App;
