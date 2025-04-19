import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/register/RegisterForm';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import StudyGroups from './pages/StudyGroups/StudyGroups';
import StudySessions from './pages/StudySessions/StudySessions';
import UFClasses from './pages/UFClasses/UFClasses';
import Profile from './pages/Profile/Profile';
import StudyRooms from './pages/StudyRooms/StudyRooms';
import Friends from './pages/Friends/Friends';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/study-groups" element={<StudyGroups />} />
                <Route path="/study-sessions" element={<StudySessions />} />
                <Route path="/uf-classes" element={<UFClasses />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/study-rooms" element={<StudyRooms />} />
                <Route path="/friends" element={<Friends />} />
            </Routes>
        </Router>
    );
}

export default App;
