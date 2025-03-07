import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState<string>("");
  const [db_flag, setDbflag] = useState<string>("");
  const [inputData, setInputData] = useState<string>("");
  const [postResponse, setPostResponse] = useState<string>("");

  useEffect(() => {
    axios.get("/api")
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("/dbstatus")
      .then(res => setDbflag(res.data))
      .catch(err => console.error(err));
  }, []);

  const handlePostRequest = () => {
    axios.post("/submit", { data: inputData })
      .then(res => setPostResponse(JSON.stringify(res.data, null, 2)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>MERN Stack App</h1>
      <p>test message: {message}</p>
      <p>db status: {db_flag}</p>
      
      <input 
        type="text" 
        value={inputData} 
        onChange={(e) => setInputData(e.target.value)} 
        placeholder="Enter data" 
      />
      <button onClick={handlePostRequest}>Send</button>
      <p>Response: {postResponse}</p>
    </div>
  );
}

export default App;
