import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/Login/Login.jsx";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios.get("/api")
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Login/>
      <h1>MERN Stack App!</h1>
      <p>{message}</p>
    </div>
  ); 
}

export default App;
