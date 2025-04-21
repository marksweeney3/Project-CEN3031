import { useState } from "react";
import styles from "./UFClasses.module.css";
import { useNavigate } from "react-router-dom";

type Course = {
    code: string;
    name: string;
    credits: number;
};

type Category = {
    category: string;
    courses: Course[];
};

const categorizedCourses: Category[] = [
    {
        category: "Accounting",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Advertising",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "African American Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "African Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "African | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Agricultural and Biological Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Agricultural and Life Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Agricultural Education and Communication",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Agricultural Operations Management",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Agronomy",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "AI | Artificial Intelligence",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Animal Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Anthropology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Applied Physiology and Kinesiology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Arabic | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Architecture",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Art + Art History",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Astronomy and Astrophysics",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Biochemistry and Molecular Biology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Biology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Biomedical Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Botany",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Business",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Career Development Program",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Chemical Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Chemistry",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Chinese | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Civil and Coastal Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Classics",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Clinical and Health Psychology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Computer & Information Science & Engineering",
        courses: [
            { code: "COP3502", name: "Programming Fundamentals 1", credits: 3 },
            { code: "COP3503", name: "Programming Fundamentals 2", credits: 3 },
            { code: "CEN3031", name: "Introduction to Software Engineering", credits: 3 },
            { code: "ENC3246", name: "Professional Communication for Engineers", credits: 3 },
            { code: "MAC2311", name: "Analytic Geometry and Calculus 1", credits: 4 },
            { code: "MAC2312", name: "Analytic Geometry and Calculus 2", credits: 4 },
            { code: "MAC2313", name: "Analytic Geometry and Calculus 3", credits: 4 },
            { code: "MAS3114", name: "Computational Linear Algebra", credits: 3 },
            { code: "PHY2048", name: "Physics with Calculus 1", credits: 4 },
            { code: "PHY2049", name: "Physics with Calculus 2", credits: 4 },
            { code: "STA3032", name: "Engineering Statistics", credits: 3 },
            { code: "COP3502C", name: "Programming Fundamentals 1", credits: 4 },
            { code: "COP3503C", name: "Programming Fundamentals 2", credits: 4 },
            { code: "COP3530", name: "Data Structures and Algorithm", credits: 3 },
            { code: "COT3100", name: "Applications of Discrete Structures", credits: 3 },
            { code: "CDA3101", name: "Introduction to Computer Organization", credits: 3 },
            { code: "CIS4301", name: "Information and Database Systems 1", credits: 3 },
            { code: "CIS4914", name: "Senior Project", credits: 3 },
            { code: "EGN4952", name: "Integrated Product and Process Design 2", credits: 3 },
            { code: "CNT4007", name: "Computer Network Fundamentals", credits: 3 },
            { code: "COP4020", name: "Programming Language Concepts", credits: 3 },
            { code: "COP4533", name: "Algorithm Abstraction and Design", credits: 3 },
            { code: "COP4600", name: "Operating Systems", credits: 3 },
            { code: "EGS4034", name: "Engineering Ethics and Professionalism", credits: 1 },
            { code: "CGS3065", name: "Legal and Social Issues in Computing", credits: 1 },
            { code: "CIS4905", name: "Individual Study in CISE", credits: 0 },
            { code: "CIS4930", name: "Special Topics in CISE", credits: 0 },
            { code: "CIS4940", name: "Practical Work", credits: 0 },
            { code: "CIS4949", name: "Co-Op Work in CISE", credits: 0 },
            { code: "EGN4912", name: "Engineering Directed Independent Research", credits: 0 },
            { code: "EGN4951", name: "Integrated Product and Process Design 1", credits: 0 },
            { code: "EIN3354", name: "Engineering Economy", credits: 0 },
            { code: "EEL3701C", name: "Digital Logic and Computer Systems", credits: 0 },
            { code: "EEL4744C", name: "Microprocessor Applications", credits: 0 },
        ],
    },
    {
        category: "Construction Management",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Criminology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Czech | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Digital Worlds Institute",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Economics",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Education | School of Human Development",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Education | School of Special Education and Childhood Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Education | School of Teaching and Learning",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Electrical and Computer Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "English",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Entomology and Nematology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Environmental Engineering Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Environmental Horticulture",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Environmental Science",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "European Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Family, Youth, and Community Services",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Film and Media Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Finance, Insurance, and Real Estate",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Fine Arts",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Fire and Emergency Services",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Fisheries and Aquatic Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Food and Resource Economics",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Food Science and Human Nutrition",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Forest, Fisheries, and Geomatics Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "French | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Gender, Sexualities, and Women's Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Geography",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Geological Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Geomatics",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "German | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Greek Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Haitian Creole | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Health Education and Behavior",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Health Professions",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Health Science",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Hebrew | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Hindi-Urdu | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "History",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Honors Program",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Horticultural Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Industrial and Systems Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Information Systems and Operations Management",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Innovation Academy",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Interdisciplinary Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Interior Design",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Italian | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Japanese | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Jewish Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Journalism",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Korean | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Landscape Architecture",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Latin American Studies",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Linguistics",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Management",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Marketing",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Mass Communication",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Materials Science and Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Mathematics",
        courses: [
            { code: "MAC2311", name: "Calculus 1", credits: 4 },
            { code: "MAC2312", name: "Calculus 2", credits: 4 },
            { code: "MAS3114", name: "Computational Linear Algebra", credits: 3 },
        ],
    },
    {
        category: "Mechanical and Aerospace Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Media Production, Management, and Technology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Medicine",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Medieval and Early Modern Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Microbiology and Cell Science",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Military Science",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Music",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Nuclear and Radiological Engineering",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Nursing",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Occupational Therapy",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Packaging Science",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Pest Management | Plant Protection",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Pharmacy",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Philosophy",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Physics",
        courses: [
            { code: "PHY2048", name: "Physics with Calculus 1", credits: 3 },
            { code: "PHY2049", name: "Physics with Calculus 2", credits: 3 },
        ],
    },
    {
        category: "Plant Pathology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Polish | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Political Science",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Portuguese",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Psychology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Public Health",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Public Relations",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Quest",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Rehabilitative Services",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Religion",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Russian | Languages, Literatures, and Cultures",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Sociology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Soil, Water, and Ecosystem Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Spanish",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Speech, Language, and Hearing Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Sport Management",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Statistics",
        courses: [
            { code: "STA2023", name: "Intro to Statistics 1", credits: 3 },
        ],
    },
    {
        category: "Sustainability and the Built Environment",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Theatre + Dance",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Tourism, Hospitality, and Event Management",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Turkish",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Urban and Regional Planning",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Veterinary Medical Sciences",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Vietnamese | Languages, Literatures, and Culture",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Wildlife Ecology and Conservation",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Writing Program",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },
    {
        category: "Zoology",
        courses: [
            { code: "XXX9999", name: "Enter", credits: 3 },
        ],
    },

];

function UFClasses() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const matchesSearch = (text: string) =>
        text.toLowerCase().includes(search.toLowerCase());

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>University of Florida Course Catalog</h1>
            <input
                className={styles.searchBar}
                type="text"
                placeholder="Search by course code, name, or category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.classList}>
                {categorizedCourses.map((categoryGroup) => {
                    const categoryMatches = matchesSearch(categoryGroup.category);
                    const courseMatches = categoryGroup.courses.filter(
                        (c) =>
                            matchesSearch(c.code) || matchesSearch(c.name)
                    );

                    // Show all courses if category matches, otherwise just show matched ones
                    const coursesToDisplay = categoryMatches
                        ? categoryGroup.courses
                        : courseMatches;

                    if (coursesToDisplay.length === 0) return null;

                    return (
                        <div key={categoryGroup.category}>
                            <h2 className={styles.category}>{categoryGroup.category}</h2>
                            <ul className={styles.courseGroup}>
                                {coursesToDisplay.map((course) => (
                                    <li key={course.code} className={styles.classItem}>
                                        <b>{course.code}</b> — {course.name} ({course.credits} credits)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <button onClick={() => navigate("/home")} className={styles.returnButton}>
                ← Return Home
            </button>

        </div>
    );
}

export default UFClasses;
