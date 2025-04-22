import styles from "./StudyRooms.module.css";
import { useNavigate } from "react-router-dom";

const libraries = [
    {
        name: "Library West",
        address: "1545 W University Ave, Gainesville, FL 32611",
        hours: "Monday–Thursday: 8 AM – 1 AM | Friday: 8 AM – 10 PM | Saturday: 9 AM – 8 PM | Sunday: 10 AM – 1 AM",
        size: "Large",
        studyRooms: "There are 18 study rooms between floors 2, 3, 6 (Graduate Student Floor) that range in capacity from 2-6 people.",
        notes: "The 4th floor is designated a quiet area. Graduate students are able to access the 6th floor, which has additional study spaces.",
    },
    {
        name: "Marston Science Library",
        address: "444 Newell Dr, Gainesville, FL 32611",
        hours: "Open 24 hours from Sunday 10 AM – Friday 10 PM | Saturday: 9 AM – 8 PM",
        size: "Large",
        studyRooms: "There are 21 study rooms between floors 1 and 2 that range in capacity from 2-10 people.",
        notes: "The first floor has many PC desktops, study rooms, and a conference space.",
    },
    {
        name: "Smathers Library (Library East)",
        address: "1508 Union Rd, Gainesville, FL 32611",
        hours: "Monday–Friday: 8 AM – 7 PM | Saturday: Closed | Sunday: 2 PM – 10 PM",
        size: "Medium",
        studyRooms: "There are no study rooms.",
        notes: "This provides quiet study spaces featuring the Grand Reading Room and the Map & Imagery Library.",
    },
    {
        name: "Education Library",
        address: "1500 Norman Hall, 618 SW 12th St, Gainesville, FL 32611",
        hours: "Monday–Thursday: 8 AM – 10 PM | Friday: 8 AM – 5 PM | Saturday: 1 PM – 5 PM | Sunday: 2 PM – 10 PM",
        size: "Medium",
        studyRooms: "There are 7 study rooms between floors 1 and 2 that range in capacity from 2-6 people.",
        notes: "This library’s study environment is homey and has a variety of technology that students can use.",
    },
    {
        name: "Health Science Center Library",
        address: "1600 SW Archer Rd, Gainesville, FL 32610",
        hours: "Monday–Thursday: 7:30 AM – 11:30 PM | Friday: 7:30 AM – 7 PM | Saturday: 8 AM – 5 PM | Sunday: 1 PM – 11:30 PM",
        size: "Large",
        studyRooms: "There are 13 group study rooms and 18 individual study rooms between floors 2 and 3 that range in capacity from 1-6 students.",
        notes: "The second floor offers a 24/7 quiet study space for HSCL users.",
    },
    {
        name: "Architecture and Fine Arts Library",
        address: "201 Fine Arts A, Gainesville, FL 32611",
        hours: "Monday-Friday: 8 AM – 6 PM",
        size: "Small",
        studyRooms: "There are no study rooms.",
        notes: "This is a quiet environment that discourages group study discussions.",
    },
    {
        name: "Legal Information Center",
        address: "UF Levin College of Law, 309 Village Dr, Gainesville, FL 32611",
        hours: "Monday-Friday: 8 AM - 5 PM",
        size: "Large",
        studyRooms: "There are 11 study rooms on floor 2 that range in capacity from 1-4 people.",
        notes: "Study rooms can be reserved with the room reservation system and are equipped with AirPlay on monitors.",
    },
    {
        name: "Judaica Library",
        address: "Ground floor, northwest corner of Library West, 1545 W University Ave, Gainesville, FL 32611",
        hours: "Reading room on Friday from 9 AM – 12 PM and 1 PM – 5 PM during school semesters.",
        size: "Small",
        studyRooms: "There are no study rooms.",
        notes: "You can book an appointment for the Judaica Suite for classes, events, and tours.",
    },
    {
        name: "Latin American and Caribbean Collection",
        address: "300 Smathers Library, Gainesville, FL 32611",
        hours: "Sunday 2 PM–  10 PM | Monday–Thursday 8 AM – 7 PM | Friday 8 AM – 5 PM | Closed Saturday.",
        size: "Medium",
        studyRooms: "There are no study rooms.",
        notes: "The Reading Room allows reasonable volume conversation for group study.",
    },
    {
        name: "Map and Imagery Library",
        address: "1st Floor of Smathers Library, PO Box 117001, Gainesville, FL 32611",
        hours: "Monday-Friday 9AM - 5 PM",
        size: "Medium",
        studyRooms: "There are no study rooms.",
        notes: "This contains roughly 500,000 maps, 300,00 aerial photographs, and 8,000 reference books.",
    },
];

function StudyRooms() {

    const navigate = useNavigate();

    // shows information about study rooms and libraries
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Study Rooms & Libraries</h1>
            <div className={styles.libraryList}>
                {libraries.map((lib, index) => (
                    <div key={index} className={styles.libraryCard}>
                        <h2 className={styles.libraryName}>{lib.name}</h2>
                        <p><strong>Address:</strong> {lib.address}</p>
                        <p><strong>Operating Hours:</strong> {lib.hours}</p>
                        <p><strong>Size:</strong> {lib.size}</p>
                        <p><strong>Study Rooms:</strong> {lib.studyRooms}</p>
                        <p><strong>Notes:</strong> {lib.notes}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate("/home")} className={styles.returnButton}>
                ← Return Home
            </button>

        </div>
    );
}

export default StudyRooms;