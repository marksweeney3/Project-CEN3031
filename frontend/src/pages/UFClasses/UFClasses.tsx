import axios from "axios";
import { useState, useEffect } from "react";
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
            { code: "ACG2021", name: "Introduction to Financial Accounting", credits: 3 },
            { code: "ACG2071", name: "Introduction to Managerial Accounting", credits: 3 },
            { code: "ACG3101", name: "Intermediate Financial Accounting 1", credits: 4 },
            { code: "TAX4001", name: "Introduction to Federal Income Tax", credits: 3 },
            { code: "ACG3401", name: "Business Processes and Accounting Information Systems", credits: 4 },
        ],
    },
    {
        category: "Advertising",
        courses: [
            { code: "ADV3008", name: "Principles of Advertising", credits: 3 },
            { code: "ADV3101", name: "Advertising Strategy", credits: 3 },
            { code: "ADV3500", name: "Advertising Research", credits: 3 },
            { code: "ADV4101", name: "Creative Advertising", credits: 3 },
            { code: "ADV4800", name: "Advertising Campaigns", credits: 3 },
        ],
    },
    {
        category: "African American Studies",
        courses: [
            { code: "AFA2000", name: "Introduction to African American Studies", credits: 3 },
            { code: "AFA3110", name: "Key Issues in African American and Black Atlantic Thought", credits: 3 },
            { code: "AFA3332", name: "Black Feminist and Womanist Theory", credits: 3 },
            { code: "AFA3350", name: "Black Masculinities", credits: 3 },
            { code: "AFA4936", name: "Senior Seminar in African American Studies", credits: 3 },
        ],
    },
    {
        category: "Agricultural and Biological Engineering",
        courses: [
            { code: "ABE2012C", name: "Introduction to Biological Engineering", credits: 3 },
            { code: "ABE3060", name: "Biological Engineering Design", credits: 3 },
            { code: "ABE3612C", name: "Heat and Mass Transfer in Biological Systems", credits: 4 },
            { code: "ABE4033", name: "Applied Hydrology", credits: 3 },
            { code: "ABE4660C", name: "Applied Microbial Biotechnology", credits: 3 },
        ],
    },
    {
        category: "Agricultural and Life Sciences",
        courses: [
            { code: "ALS3153", name: "Agricultural Ecology", credits: 3 },
            { code: "ALS3203", name: "Career Development in Agriculture and Life Sciences", credits: 3 },
            { code: "ALS4161", name: "Exploring Agricultural and Life Sciences Issues", credits: 3 },
            { code: "ALS4932", name: "Special Topics in Agricultural and Life Sciences", credits: 3 },
            { code: "ALS4419", name: "Agricultural Risk Management and the Law", credits: 3 },
        ],
    },
    {
        category: "Animal Sciences",
        courses: [
            { code: "ANS3006", name: "Introduction to Animal Science", credits: 3 },
            { code: "ANS3440", name: "Principles of Animal Nutrition", credits: 4 },
            { code: "ANS3217C", name: "Equine Science", credits: 3 },
            { code: "ANS3613L", name: "Meat Selection and Grading", credits: 2 },
            { code: "ANS4932", name: "Special Topics in Animal Sciences", credits: 3 },
        ],
    },
    {
        category: "Anthropology",
        courses: [
            { code: "ANT2000", name: "General Anthropology", credits: 3 },
            { code: "ANT2410", name: "Cultural Anthropology", credits: 3 },
            { code: "ANT3514C", name: "Introduction to Biological Anthropology", credits: 4 },
            { code: "ANT3620", name: "Language and Culture", credits: 3 },
            { code: "ANT4114", name: "Principles of Archaeology", credits: 3 },
        ],
    },
    {
        category: "Applied Physiology and Kinesiology",
        courses: [
            { code: "APK2100C", name: "Applied Human Anatomy with Laboratory", credits: 4 },
            { code: "APK2105C", name: "Applied Human Physiology with Laboratory", credits: 4 },
            { code: "APK3110C", name: "Physiology of Exercise and Training", credits: 3 },
            { code: "APK3220C", name: "Biomechanics of Human Motion", credits: 3 },
            { code: "APK3400", name: "Introduction to Sport Psychology", credits: 3 },
        ],
    },
    {
        category: "Architecture",
        courses: [
            { code: "ARC1701", name: "Architectural History 1", credits: 3 },
            { code: "ARC2201", name: "Architectural Design 1", credits: 4 },
            { code: "ARC2303", name: "Architectural Structures 1", credits: 3 },
            { code: "ARC3320", name: "Architectural Structures 2", credits: 3 },
            { code: "ARC4071", name: "Architectural Environmental Technology 1", credits: 3 },
        ],
    },
    {
        category: "Art + Art History",
        courses: [
            { code: "ARH2050", name: "Introduction to the Principles and History of Art 1", credits: 3 },
            { code: "ARH2051", name: "Introduction to the Principles and History of Art 2", credits: 3 },
            { code: "ART2305C", name: "Perceptual Drawing", credits: 3 },
            { code: "ART2701C", name: "Sculpture: Shaping Form and Space", credits: 3 },
            { code: "ART2930C", name: "Special Topics in Studio Art", credits: 3 },
        ],
    },
    {
        category: "Astronomy and Astrophysics",
        courses: [
            { code: "AST1002", name: "Discovering the Universe", credits: 3 },
            { code: "AST3018", name: "Astronomy and Astrophysics 1", credits: 3 },
            { code: "AST3019", name: "Astronomy and Astrophysics 2", credits: 3 },
            { code: "AST3722C", name: "Observational Techniques in Astronomy", credits: 3 },
            { code: "AST4300", name: "Galaxies and Cosmology", credits: 3 },
        ],
    },
    {
        category: "Biochemistry and Molecular Biology",
        courses: [
            { code: "BCH4024", name: "Introduction to Biochemistry and Molecular Biology", credits: 4 },
            { code: "BCH3025", name: "Fundamentals of Biochemistry", credits: 3 },
            { code: "BCH4905", name: "Biochemistry Research", credits: 1 },
            { code: "BCH6415", name: "Advanced Molecular Biology", credits: 3 },
            { code: "BCH6740", name: "Advanced Biochemistry", credits: 3 },
        ],
    },
    {
        category: "Biology",
        courses: [
            { code: "BSC2010", name: "Integrated Principles of Biology 1", credits: 3 },
            { code: "BSC2011", name: "Integrated Principles of Biology 2", credits: 3 },
            { code: "BSC2010L", name: "Integrated Principles of Biology 1 Laboratory", credits: 1 },
            { code: "BSC2011L", name: "Integrated Principles of Biology 2 Laboratory", credits: 1 },
            { code: "PCB3063", name: "Genetics", credits: 4 },
        ],
    },
    {
        category: "Biomedical Engineering",
        courses: [
            { code: "BME3053C", name: "Computer Applications for BME", credits: 3 },
            { code: "BME4503", name: "Biomedical Instrumentation", credits: 3 },
            { code: "BME4409", name: "Engineering Physiology", credits: 3 },
            { code: "BME4632", name: "Biomedical Transport Phenomena", credits: 3 },
            { code: "BME4882", name: "Senior Design in Biomedical Engineering", credits: 3 },
        ],
    },
    {
        category: "Botany",
        courses: [
            { code: "BOT2010C", name: "Introductory Botany", credits: 4 },
            { code: "BOT2710C", name: "Practical Plant Taxonomy", credits: 3 },
            { code: "BOT3151C", name: "Local Flora of North Florida", credits: 3 },
            { code: "BOT3503", name: "Physiology and Molecular Biology of Plants", credits: 3 },
            { code: "BOT4935", name: "Special Topics in Botany", credits: 3 },
        ],
    },
    {
        category: "Business",
        courses: [
            { code: "GEB3213", name: "Professional Writing in Business", credits: 3 },
            { code: "MAN3025", name: "Principles of Management", credits: 4 },
            { code: "MAR3023", name: "Principles of Marketing", credits: 4 },
            { code: "FIN3403", name: "Business Finance", credits: 4 },
            { code: "BUL4310", name: "The Legal Environment of Business", credits: 4 },
        ],
    },
    {
        category: "Career Development Program",
        courses: [
            { code: "SLS1102", name: "First Year Florida", credits: 1 },
            { code: "SLS1401", name: "Career and Life Span Planning", credits: 3 },
            { code: "SLS2301", name: "Career Planning", credits: 3 },
            { code: "SLS1501", name: "College Success", credits: 3 },
            { code: "SLS4950", name: "Leadership Development", credits: 3 },
        ],
    },
    {
        category: "Chemical Engineering",
        courses: [
            { code: "ECH3023", name: "Material and Energy Balances", credits: 4 },
            { code: "ECH3101", name: "Process Thermodynamics", credits: 3 },
            { code: "ECH3203", name: "Fluid and Solid Operations", credits: 3 },
            { code: "ECH4403", name: "Separation and Mass Transfer Operations", credits: 3 },
            { code: "ECH4504", name: "Chemical Kinetics and Reactor Design", credits: 3 },
        ],
    },
    {
        category: "Chemistry",
        courses: [
            { code: "CHM2045", name: "General Chemistry 1", credits: 3 },
            { code: "CHM2046", name: "General Chemistry 2", credits: 3 },
            { code: "CHM2210", name: "Organic Chemistry 1", credits: 3 },
            { code: "CHM2211", name: "Organic Chemistry 2", credits: 3 },
            { code: "CHM3120", name: "Introduction to Analytical Chemistry", credits: 3 },
        ],
    },
    {
        category: "Chinese | Languages, Literatures, and Cultures",
        courses: [
            { code: "CHI1130", name: "Beginning Chinese 1", credits: 5 },
            { code: "CHI1131", name: "Beginning Chinese 2", credits: 5 },
            { code: "CHI2230", name: "Intermediate Chinese 1", credits: 3 },
            { code: "CHI2231", name: "Intermediate Chinese 2", credits: 3 },
            { code: "CHI3410", name: "Advanced Chinese 1", credits: 3 },
        ],
    },
    {
        category: "Civil and Coastal Engineering",
        courses: [
            { code: "CGN2002", name: "Introduction to Civil Engineering", credits: 1 },
            { code: "CGN3421", name: "Computer Methods in Civil Engineering", credits: 3 },
            { code: "CES3102", name: "Mechanics of Materials", credits: 3 },
            { code: "CEG4011", name: "Soil Mechanics", credits: 4 },
            { code: "CWR3201", name: "Hydrodynamics", credits: 3 },
        ],
    },
    {
        category: "Classics",
        courses: [
            { code: "CLT3370", name: "Mythology of Greece and Rome", credits: 3 },
            { code: "CLA3160", name: "Ancient Egypt", credits: 3 },
            { code: "CLA3700", name: "Classical Archaeology", credits: 3 },
            { code: "GRK1120", name: "Beginning Greek 1", credits: 5 },
            { code: "LAT1120", name: "Beginning Latin 1", credits: 5 },
        ],
    },
    {
        category: "Clinical and Health Psychology",
        courses: [
            { code: "CLP3144", name: "Abnormal Psychology", credits: 3 },
            { code: "CLP3305", name: "Introduction to Clinical Psychology", credits: 3 },
            { code: "CLP4314", name: "Health Psychology", credits: 3 },
            { code: "CLP4420", name: "Introduction to Neuropsychology", credits: 3 },
            { code: "CLP4134", name: "Introduction to Behavioral Medicine", credits: 3 },
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
            { code: "CIS4905", name: "Individual Study in CISE", credits: 1-3 },
            { code: "CIS4930", name: "Special Topics in CISE", credits: 3 },
            { code: "CIS4940", name: "Practical Work", credits: 1-3 },
            { code: "CIS4949", name: "Co-Op Work in CISE", credits: 1-3 },
            { code: "EGN4912", name: "Engineering Directed Independent Research", credits: 3 },
            { code: "EGN4951", name: "Integrated Product and Process Design 1", credits: 3 },
            { code: "EIN3354", name: "Engineering Economy", credits: 3 },
            { code: "EEL3701C", name: "Digital Logic and Computer Systems", credits: 4 },
            { code: "EEL4744C", name: "Microprocessor Applications", credits: 4 },
        ],
    },
    {
        "category": "Construction Management",
        "courses": [
          { code: "BCN3027", name: "Construction Estimating", credits: 3 },
          { code: "BCN3223", name: "Soils and Foundations", credits: 3 },
          { code: "BCN3611", name: "Construction Scheduling", credits: 3 }
        ]
      },
      {
        "category": "Criminology",
        "courses": [
          { code: "CCJ3024", name: "Introduction to Criminal Justice", credits: 3 },
          { code: "CCJ3701", name: "Research Methods in Criminology", credits: 3 },
          { code: "CCJ4014", name: "Criminological Theory", credits: 3 }
        ]
      },
      {
        "category": "Czech | Languages, Literatures, and Cultures",
        "courses": [
          { code: "CZE1130", name: "Beginning Czech 1", credits: 5 },
          { code: "CZE1131", name: "Beginning Czech 2", credits: 5 },
          { code: "CZE2200", name: "Intermediate Czech", credits: 3 }
        ]
      },
      {
        "category": "Digital Worlds Institute",
        "courses": [
          { code: "DIG2000", name: "Foundations of Digital Culture", credits: 3 },
          { code: "DIG2632", name: "Creating Mobile Games", credits: 3 },
          { code: "DIG3525", name: "Digital Storytelling", credits: 3 }
        ]
      },
      {
        "category": "Economics",
        "courses": [
          { code: "ECO2013", name: "Principles of Macroeconomics", credits: 4 },
          { code: "ECO2023", name: "Principles of Microeconomics", credits: 4 },
          { code: "ECO3101", name: "Intermediate Microeconomics", credits: 4 }
        ]
      },
      {
        category: "Education | School of Human Development",
        courses: [
            { code: "EDF1005", name: "Introduction to Education", credits: 3 },
            { code: "EDF3110", name: "Human Growth and Development", credits: 3 },
            { code: "EDF3210", name: "Educational Psychology", credits: 3 },
            { code: "EDF3604", name: "Social Foundations of Education", credits: 3 },
            { code: "EDF4430", name: "Measurement and Evaluation in Education", credits: 3 },
        ],
    },
    {
        category: "Education | School of Special Education and Childhood Studies",
        courses: [
            { code: "EEX2000", name: "Introduction to Special Education", credits: 3 },
            { code: "EEX3012", name: "Introduction to Special Education Practices", credits: 3 },
            { code: "EEX3070", name: "Teachers and Learners in Inclusive Schools", credits: 3 },
            { code: "EEX3093", name: "Exceptional People in School and Society", credits: 3 },
            { code: "EEX4280", name: "Disabilities in Community and Work", credits: 3 },
        ],
    },
    {
        category: "Education | School of Teaching and Learning",
        courses: [
            { code: "EDG3323", name: "General Methods of Teaching", credits: 3 },
            { code: "EDG4203", name: "Elementary Curriculum and Instruction", credits: 3 },
            { code: "EDG4410", name: "Classroom Management and Communication", credits: 3 },
            { code: "EDG4930", name: "Special Topics in Education", credits: 3 },
            { code: "RED3309", name: "Early Literacy Learning and Assessment", credits: 3 },
        ],
    },
    {
        category: "Electrical and Computer Engineering",
        courses: [
            { code: "EEL3003", name: "Elements of Electrical Engineering", credits: 3 },
            { code: "EEL3111C", name: "Circuits 1", credits: 4 },
            { code: "EEL3701C", name: "Digital Logic and Computer Systems", credits: 4 },
            { code: "EEL4744C", name: "Microprocessor Applications", credits: 4 },
            { code: "EEL4924C", name: "Electrical Engineering Design", credits: 3 },
        ],
    },
    {
        category: "Engineering",
        courses: [
            { code: "EGN2020C", name: "Engineering Design and Society", credits: 2 },
            { code: "EGN3353C", name: "Fluid Mechanics", credits: 3 },
            { code: "EGN3365", name: "Materials in Engineering", credits: 3 },
            { code: "EGN3615", name: "Engineering Economy", credits: 3 },
            { code: "EGN4951", name: "Integrated Product and Process Design 1", credits: 3 },
        ],
    },
    {
        category: "English",
        courses: [
            { code: "ENC1101", name: "Expository and Argumentative Writing", credits: 3 },
            { code: "ENC3254", name: "Professional Writing in the Discipline", credits: 3 },
            { code: "AML2070", name: "Survey of American Literature", credits: 3 },
            { code: "ENL2022", name: "Survey of English Literature: 1750 to Present", credits: 3 },
            { code: "LIT2000", name: "Introduction to Literature", credits: 3 },
        ],
    },
    {
        category: "Entomology and Nematology",
        courses: [
            { code: "ENY1001", name: "Bugs and People", credits: 3 },
            { code: "ENY2040", name: "The Insects", credits: 3 },
            { code: "ENY3005", name: "Principles of Entomology", credits: 3 },
            { code: "ENY3510C", name: "Insect Classification", credits: 3 },
            { code: "ENY4161", name: "Insect Behavior", credits: 3 },
        ],
    },
    {
        category: "Environmental Engineering Sciences",
        courses: [
            { code: "ENV3001", name: "Introduction to Environmental Engineering", credits: 3 },
            { code: "ENV3040C", name: "Environmental Engineering Laboratory", credits: 3 },
            { code: "ENV4101", name: "Elements of Air Pollution", credits: 3 },
            { code: "ENV4514C", name: "Water and Wastewater Treatment", credits: 4 },
            { code: "ENV4601", name: "Environmental Resources Management", credits: 3 },
        ],
    },
    {
        category: "Environmental Horticulture",
        courses: [
            { code: "ORH1030", name: "Plants, Gardening, and You", credits: 3 },
            { code: "ORH3513C", name: "Environmental Plant Identification and Use", credits: 3 },
            { code: "ORH4223C", name: "Landscape and Turfgrass Management", credits: 3 },
            { code: "ORH4804", name: "Annual and Perennial Gardening", credits: 3 },
            { code: "ORH4932", name: "Special Topics in Environmental Horticulture", credits: 3 },
        ],
    },
    {
        category: "Environmental Science",
        courses: [
            { code: "EVS3000", name: "Environmental Science", credits: 3 },
            { code: "EVS4021", name: "Critical Thinking in Environmental Science", credits: 3 },
            { code: "EVS4932", name: "Special Topics in Environmental Science", credits: 3 },
            { code: "EVS4949", name: "Environmental Science Internship", credits: 3 },
            { code: "EVS4950", name: "Environmental Science Capstone", credits: 3 },
        ],
    },
    {
        category: "European Studies",
        courses: [
            { code: "EUS2001", name: "European Experience: A Humanities Perspective", credits: 3 },
            { code: "EUS3100", name: "European Cinema", credits: 3 },
            { code: "EUS3930", name: "Special Topics in European Studies", credits: 3 },
            { code: "EUS4210", name: "Politics and Institutions of the European Union", credits: 3 },
            { code: "EUS4930", name: "Advanced Topics in European Studies", credits: 3 },
        ],
    },
    {
        category: "Family, Youth, and Community Sciences",
        courses: [
            { code: "FYC3001", name: "Introduction to Family, Youth, and Community Sciences", credits: 3 },
            { code: "FYC3101", name: "Parent-Child Relationships", credits: 3 },
            { code: "FYC3201", name: "Foundations of Youth Development", credits: 3 },
            { code: "FYC4003", name: "Community Development", credits: 3 },
            { code: "FYC4408", name: "Organizational Leadership for Nonprofits", credits: 3 },
        ],
    },
    {
        category: "Film and Media Studies",
        courses: [
            { code: "ENG3115", name: "Introduction to Film: Criticism and Theory", credits: 3 },
            { code: "ENG3121", name: "History of Film 1", credits: 3 },
            { code: "ENG3122", name: "History of Film 2", credits: 3 },
            { code: "ENG4133", name: "Film Genres", credits: 3 },
            { code: "ENG4136", name: "Film and Video Production", credits: 3 },
        ],
    },
    {
        category: "Finance, Insurance, and Real Estate",
        courses: [
            { code: "FIN3403", name: "Business Finance", credits: 4 },
            { code: "FIN4243", name: "Debt and Money Markets", credits: 3 },
            { code: "FIN4504", name: "Equity and Capital Markets", credits: 3 },
            { code: "REE3043", name: "Real Estate Analysis", credits: 4 },
            { code: "REE4303", name: "Real Estate Investment Decision Making", credits: 3 },
        ],
    },
    {
        category: "Fine Arts",
        courses: [
            { code: "ART1803C", name: "Workshop for Art Research and Practice", credits: 3 },
            { code: "ART2305C", name: "Perceptual Drawing", credits: 3 },
            { code: "ART2701C", name: "Sculpture: Shaping Form and Space", credits: 3 },
            { code: "ART2930C", name: "Special Topics in Studio Art", credits: 3 },
            { code: "ART3807C", name: "Experimental Drawing", credits: 3 },
        ],
    },
    {
        category: "Fire and Emergency Services",
        courses: [
            { code: "FES3003", name: "Fire and Emergency Services Administration", credits: 3 },
            { code: "FES3015", name: "Principles of Fire and Emergency Services Safety and Survival", credits: 3 },
            { code: "FES3753", name: "Community Risk Reduction", credits: 3 },
            { code: "FES4004", name: "Political and Legal Foundations of Fire Protection", credits: 3 },
            { code: "FES4023", name: "Fire and Emergency Services Ethical Practices", credits: 3 },
        ],
    },
    {
        category: "Fisheries and Aquatic Sciences",
        courses: [
            { code: "FAS2024", name: "Global and Regional Perspectives in Fisheries", credits: 3 },
            { code: "FAS4202C", name: "Biology of Fishes", credits: 4 },
            { code: "FAS4305C", name: "Introduction to Fishery Science", credits: 3 },
            { code: "FAS4405", name: "Aquariums, Water, and Aquaculture", credits: 3 },
            { code: "FAS4932", name: "Special Topics in Fisheries and Aquatic Sciences", credits: 3 },
        ],
    },
    {
        category: "Food and Resource Economics",
        courses: [
            { code: "AEB2014", name: "Economic Issues, Food, and You", credits: 3 },
            { code: "AEB3103", name: "Principles of Food and Resource Economics", credits: 3 },
            { code: "AEB3133", name: "Principles of Agribusiness Management", credits: 3 },
            { code: "AEB3300", name: "Agricultural and Food Marketing", credits: 3 },
            { code: "AEB3450", name: "Introduction to Natural Resource and Environmental Economics", credits: 3 },
        ],
    },
    {
        category: "Food Science and Human Nutrition",
        courses: [
            { code: "FOS2001", name: "Man's Food", credits: 3 },
            { code: "FOS3042", name: "Introductory Food Science", credits: 3 },
            { code: "FOS4204", name: "Food Safety and Sanitation", credits: 3 },
            { code: "FOS4222", name: "Food Microbiology", credits: 3 },
            { code: "HUN2201", name: "Fundamentals of Human Nutrition", credits: 3 },
        ],
    },
    {
        category: "Forest, Fisheries, and Geomatics Sciences",
        courses: [
            { code: "FOR2662", name: "Forest Resources in Changing Climates", credits: 3 },
            { code: "FOR3202", name: "Society and Natural Resources", credits: 3 },
            { code: "FOR3434C", name: "Forest Resources Information Systems", credits: 3 },
            { code: "FOR4621", name: "Forest Economics and Management", credits: 3 },
            { code: "FOR4934", name: "Topics in Forest Resources and Conservation", credits: 3 },
        ],
    },
    {
        category: "French | Languages, Literatures, and Cultures",
        courses: [
            { code: "FRE1130", name: "Beginning French 1", credits: 5 },
            { code: "FRE1131", name: "Beginning French 2", credits: 5 },
            { code: "FRE2200", name: "Intermediate French 1", credits: 3 },
            { code: "FRE2201", name: "Intermediate French 2", credits: 3 },
            { code: "FRE3410", name: "Advanced French Conversation", credits: 3 },
        ],
    },
    {
        category: "Gender, Sexualities, and Women's Studies",
        courses: [
            { code: "WST3015", name: "Introduction to Women's Studies", credits: 3 },
            { code: "WST3415", name: "Gender, Race, and Science", credits: 3 },
            { code: "WST3603", name: "Sexualities Studies", credits: 3 },
            { code: "WST4641", name: "Gender and Health", credits: 3 },
            { code: "WST4930", name: "Special Topics in Women's Studies", credits: 3 },
        ],
    },
    {
        category: "Geography",
        courses: [
            { code: "GEO2200", name: "Physical Geography", credits: 3 },
            { code: "GEO2410", name: "Social Geography", credits: 3 },
            { code: "GEO2500", name: "Global and Regional Economies", credits: 3 },
            { code: "GEO3250", name: "Climatology", credits: 3 },
            { code: "GEO4281", name: "Geographic Information Systems", credits: 3 },
        ],
    },
    {
        category: "Geological Sciences",
        courses: [
            { code: "GLY2010C", name: "Physical Geology", credits: 4 },
            { code: "GLY2100C", name: "Historical Geology", credits: 4 },
            { code: "GLY3202C", name: "Earth Materials", credits: 4 },
            { code: "GLY3603C", name: "Paleontology", credits: 4 },
            { code: "GLY4310C", name: "Igneous and Metamorphic Petrology", credits: 4 },
        ],
    },
    {
        category: "Geomatics",
        courses: [
            { code: "SUR3103C", name: "Geometric Geodesy", credits: 3 },
            { code: "SUR3323C", name: "Location and Mapping", credits: 3 },
            { code: "SUR3393", name: "Geospatial Applications", credits: 3 },
            { code: "SUR4403", name: "Photogrammetry", credits: 3 },
            { code: "SUR4940", name: "Geomatics Internship", credits: 3 },
        ],
    },
    {
        category: "German | Languages, Literatures, and Cultures",
        courses: [
            { code: "GER1120", name: "Beginning German 1", credits: 5 },
            { code: "GER1121", name: "Beginning German 2", credits: 5 },
            { code: "GER2200", name: "Intermediate German 1", credits: 3 },
            { code: "GER2201", name: "Intermediate German 2", credits: 3 },
            { code: "GER3401", name: "Advanced German Conversation", credits: 3 },
        ],
    },
    {
        category: "Greek Studies",
        courses: [
            { code: "GRK1120", name: "Beginning Greek 1", credits: 5 },
            { code: "GRK1121", name: "Beginning Greek 2", credits: 5 },
            { code: "GRK2200", name: "Intermediate Greek 1", credits: 3 },
            { code: "GRK2201", name: "Intermediate Greek 2", credits: 3 },
            { code: "GRK4300", name: "Advanced Greek Readings", credits: 3 },
        ],
    },
    {
        category: "Haitian Creole | Languages, Literatures, and Cultures",
        courses: [
            { code: "HAI1130", name: "Beginning Haitian Creole 1", credits: 5 },
            { code: "HAI1131", name: "Beginning Haitian Creole 2", credits: 5 },
            { code: "HAI2200", name: "Intermediate Haitian Creole 1", credits: 3 },
            { code: "HAI2201", name: "Intermediate Haitian Creole 2", credits: 3 },
            { code: "HAI3500", name: "Haitian Creole Literature and Culture", credits: 3 },
        ],
    },
    {
        category: "Health Education and Behavior",
        courses: [
            { code: "HSC3102", name: "Personal and Family Health", credits: 3 },
            { code: "HSC3201", name: "Community and Environmental Health", credits: 3 },
            { code: "HSC4233", name: "Patient Health Education", credits: 3 },
            { code: "HSC4302", name: "Methods and Materials in Health Education", credits: 3 },
            { code: "HSC4579", name: "Women's Health Issues", credits: 3 },
        ],
    },
    {
        category: "Health Professions",
        courses: [
            { code: "HSA3111", name: "Introduction to Health Administration", credits: 3 },
            { code: "HSA4110", name: "Healthcare System and Policy", credits: 3 },
            { code: "HSA4191", name: "Health Informatics", credits: 3 },
            { code: "HSA4340", name: "Healthcare Human Resources Management", credits: 3 },
            { code: "HSA4700", name: "Healthcare Quality Management", credits: 3 },
        ],
    },
    {
        category: "Health Science",
        courses: [
            { code: "HSC2000", name: "Introduction to Health Professions", credits: 3 },
            { code: "HSC3057", name: "Research Methods and Issues in Health Science", credits: 3 },
            { code: "HSC3502", name: "Survey of Diseases and Disabilities 1", credits: 3 },
            { code: "HSC4558", name: "Disability Management", credits: 3 },
            { code: "HSC4930", name: "Special Topics in Health Science", credits: 3 },
        ],
    },
    {
        category: "Hebrew | Languages, Literatures, and Cultures",
        courses: [
            { code: "HBR1130", name: "Beginning Modern Hebrew 1", credits: 5 },
            { code: "HBR1131", name: "Beginning Modern Hebrew 2", credits: 5 },
            { code: "HBR2220", name: "Intermediate Modern Hebrew 1", credits: 3 },
            { code: "HBR2221", name: "Intermediate Modern Hebrew 2", credits: 3 },
            { code: "HBR3410", name: "Advanced Modern Hebrew", credits: 3 },
        ],
    },
    {
        category: "Hindi-Urdu | Languages, Literatures, and Cultures",
        courses: [
            { code: "HIN1130", name: "Beginning Hindi 1", credits: 5 },
            { code: "HIN1131", name: "Beginning Hindi 2", credits: 5 },
            { code: "HIN2200", name: "Intermediate Hindi 1", credits: 3 },
            { code: "HIN2201", name: "Intermediate Hindi 2", credits: 3 },
            { code: "HIN3410", name: "Advanced Hindi", credits: 3 },
        ],
    },
    {
        category: "History",
        courses: [
            { code: "AMH2010", name: "United States History to 1877", credits: 3 },
            { code: "AMH2020", name: "United States History Since 1877", credits: 3 },
            { code: "EUH2000", name: "Western Civilization: From Antiquity to the Middle Ages", credits: 3 },
            { code: "EUH2001", name: "Western Civilization: From the Renaissance to the Present", credits: 3 },
            { code: "HIS3931", name: "Special Topics in History", credits: 3 },
        ],
    },
    {
        category: "Honors Program",
        courses: [
            { code: "IDH2931", name: "Honors Seminar", credits: 3 },
            { code: "IDH3931", name: "Interdisciplinary Honors Seminar", credits: 3 },
            { code: "IDH4905", name: "Individual Study in Honors", credits: 1 },
            { code: "IDH4917", name: "Undergraduate Research in Honors", credits: 3 },
            { code: "IDH4956", name: "Honors Thesis", credits: 3 },
        ],
    },
    {
        category: "Horticultural Sciences",
        courses: [
            { code: "HOS3020C", name: "Principles of Horticultural Crop Production", credits: 4 },
            { code: "HOS3430C", name: "Nutrition of Horticultural Crops", credits: 3 },
            { code: "HOS4304", name: "Horticultural Physiology", credits: 3 },
            { code: "HOS4341", name: "Advanced Horticultural Crop Management", credits: 3 },
            { code: "HOS4933", name: "Special Topics in Horticultural Sciences", credits: 3 },
        ],
    },
    {
        category: "Industrial and Systems Engineering",
        courses: [
            { code: "EIN3101", name: "Introduction to Industrial and Systems Engineering", credits: 3 },
            { code: "EIN4354", name: "Engineering Economy", credits: 3 },
            { code: "EIN4360", name: "Facility Planning and Work Design", credits: 3 },
            { code: "EIN4451", name: "Lean Production Systems", credits: 3 },
            { code: "EIN4905", name: "Special Problems in Industrial and Systems Engineering", credits: 3 },
        ],
    },
    {
        category: "Information Systems and Operations Management",
        courses: [
            { code: "ISM3004", name: "Computing in the Business Environment", credits: 4 },
            { code: "ISM3254", name: "Business Systems 1", credits: 4 },
            { code: "ISM4113", name: "Business Systems Design and Applications", credits: 4 },
            { code: "ISM4210", name: "Database Management", credits: 4 },
            { code: "ISM4330", name: "Information Systems and Operations Strategy", credits: 4 },
        ],
    },
    {
        category: "Innovation Academy",
        courses: [
            { code: "IDS1359", name: "Creativity in Action", credits: 3 },
            { code: "IDS1940", name: "Innovation in Action", credits: 3 },
            { code: "IDS4950", name: "Innovation Academy Capstone", credits: 3 },
            { code: "IDS2935", name: "Special Topics in Innovation", credits: 3 },
            { code: "IDS1353", name: "Creativity and Design Thinking", credits: 3 },
        ],
    },
    {
        category: "Interdisciplinary Studies",
        courses: [
            { code: "IDS1161", name: "What is the Good Life?", credits: 3 },
            { code: "IDS2935", name: "Special Topics in Interdisciplinary Studies", credits: 3 },
            { code: "IDS4956", name: "Interdisciplinary Studies Capstone", credits: 3 },
            { code: "IDS4906", name: "Interdisciplinary Research", credits: 3 },
            { code: "IDS1359", name: "Creativity in Action", credits: 3 },
        ],
    },
    {
        category: "Interior Design",
        courses: [
            { code: "IND2100", name: "History of Interior Design 1", credits: 3 },
            { code: "IND2130", name: "History of Interior Design 2", credits: 3 },
            { code: "IND2635C", name: "Interior Design Graphics 1", credits: 4 },
            { code: "IND3215", name: "Interior Design Studio 1", credits: 5 },
            { code: "IND4225", name: "Interior Design Studio 2", credits: 5 },
        ],
    },
    {
        category: "Italian | Languages, Literatures, and Cultures",
        courses: [
            { code: "ITA1130", name: "Beginning Italian 1", credits: 5 },
            { code: "ITA1131", name: "Beginning Italian 2", credits: 5 },
            { code: "ITA2200", name: "Intermediate Italian 1", credits: 3 },
            { code: "ITA2201", name: "Intermediate Italian 2", credits: 3 },
            { code: "ITA3410", name: "Advanced Italian Conversation", credits: 3 },
        ],
    },
    {
        category: "Japanese | Languages, Literatures, and Cultures",
        courses: [
            { code: "JPN1130", name: "Beginning Japanese 1", credits: 5 },
            { code: "JPN1131", name: "Beginning Japanese 2", credits: 5 },
            { code: "JPN2230", name: "Intermediate Japanese 1", credits: 3 },
            { code: "JPN2231", name: "Intermediate Japanese 2", credits: 3 },
            { code: "JPN3410", name: "Advanced Japanese Conversation", credits: 3 },
        ],
    },
    {
        category: "Jewish Studies",
        courses: [
            { code: "JST2930", name: "Special Topics in Jewish Studies", credits: 3 },
            { code: "JST3930", name: "Advanced Topics in Jewish Studies", credits: 3 },
            { code: "JST4936", name: "Senior Seminar in Jewish Studies", credits: 3 },
            { code: "HBR1130", name: "Beginning Modern Hebrew 1", credits: 5 },
            { code: "HBR1131", name: "Beginning Modern Hebrew 2", credits: 5 },
        ],
    },
    {
        category: "Journalism",
        courses: [
            { code: "JOU3101", name: "Reporting", credits: 3 },
            { code: "JOU3110", name: "Applied Fact Finding", credits: 3 },
            { code: "JOU4004", name: "History of Journalism", credits: 3 },
            { code: "JOU4308", name: "Magazine and Feature Writing", credits: 3 },
            { code: "JOU4930", name: "Special Topics in Journalism", credits: 3 },
        ],
    },
    {
        category: "Korean | Languages, Literatures, and Cultures",
        courses: [
            { code: "KOR1130", name: "Beginning Korean 1", credits: 5 },
            { code: "KOR1131", name: "Beginning Korean 2", credits: 5 },
            { code: "KOR2220", name: "Intermediate Korean 1", credits: 3 },
        ],
    },
    {
        category: "Landscape Architecture",
        courses: [
            { code: "LAA2330", name: "Site Analysis", credits: 3 },
            { code: "LAA2376", name: "Design Communications", credits: 3 },
            { code: "LAA3350C", name: "Planting Design", credits: 3 },
        ],
    },
    {
        category: "Latin American Studies",
        courses: [
            { code: "LAS2001", name: "Introduction to Latin American Studies", credits: 3 },
            { code: "LAS3930", name: "Special Topics in Latin American Studies", credits: 3 },
            { code: "LAS4935", name: "Seminar in Latin American Studies", credits: 3 },
        ],
    },
    {
        category: "Linguistics",
        courses: [
            { code: "LIN3010", name: "Introduction to Linguistics", credits: 3 },
            { code: "LIN3201", name: "Sounds of Human Language", credits: 3 },
            { code: "LIN3460", name: "Structure of Human Language", credits: 3 },
        ],
    },
    {
        category: "Management",
        courses: [
            { code: "MAN3025", name: "Principles of Management", credits: 4 },
            { code: "MAN4301", name: "Human Resource Management", credits: 4 },
            { code: "MAN4723", name: "Strategic Management", credits: 4 },
        ],
    },
    {
        category: "Marketing",
        courses: [
            { code: "MAR3023", name: "Principles of Marketing", credits: 4 },
            { code: "MAR3503", name: "Consumer Behavior", credits: 4 },
            { code: "MAR4803", name: "Marketing Management", credits: 4 },
        ],
    },
    {
        category: "Mass Communication",
        courses: [
            { code: "MMC1009", name: "Introduction to Media and Communications", credits: 3 },
            { code: "MMC2100", name: "Writing for Media", credits: 3 },
            { code: "MMC4200", name: "Law of Mass Communication", credits: 3 },
        ],
    },
    {
        category: "Materials Science and Engineering",
        courses: [
            { code: "EMA3010", name: "Materials", credits: 3 },
            { code: "EMA3066", name: "Introduction to Organic Materials", credits: 3 },
            { code: "EMA4314", name: "Energetics and Kinetics in Materials Science", credits: 3 },
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
            { code: "EGM2511", name: "Statics", credits: 3 },
            { code: "EGM3520", name: "Mechanics of Materials", credits: 3 },
            { code: "EML3007", name: "Thermodynamics", credits: 3 },
        ],
    },
    {
        category: "Media Production, Management, and Technology",
        courses: [
            { code: "RTV2100", name: "Writing for Electronic Media", credits: 3 },
            { code: "RTV3001", name: "Introduction to Media Industries and Professions", credits: 3 },
            { code: "RTV3511", name: "Production Planning", credits: 3 },
        ],
    },
    {
        category: "Medicine",
        courses: [
            { code: "BMS3521", name: "Human Physiology", credits: 3 },
            { code: "BMS4905", name: "Medical Sciences Research", credits: 3 },
            { code: "BMS4931", name: "Special Topics in Medical Sciences", credits: 3 },
        ],
    },
    {
        category: "Medieval and Early Modern Sciences",
        courses: [
            { code: "MEM3000", name: "Introduction to Medieval Studies", credits: 3 },
            { code: "MEM4930", name: "Special Topics in Medieval Studies", credits: 3 },
            { code: "MEM4931", name: "Seminar in Medieval Studies", credits: 3 },
        ],
    },
    {
        category: "Microbiology and Cell Science",
        courses: [
            { code: "MCB2000", name: "Microbiology", credits: 3 },
            { code: "MCB3020", name: "Basic Biology of Microorganisms", credits: 3 },
            { code: "MCB4203", name: "Bacterial Pathogens", credits: 3 },
        ],
    },
    {
        category: "Military Science",
        courses: [
            { code: "MSL1001", name: "Introduction to the Army", credits: 2 },
            { code: "MSL2101", name: "Leadership and Decision Making", credits: 2 },
            { code: "MSL3201", name: "Applied Leadership", credits: 3 },
        ],
    },
    {
        category: "Music",
        courses: [
            { code: "MUS1010", name: "Introduction to Music", credits: 3 },
            { code: "MUS1360", name: "Music Theory 1", credits: 3 },
            { code: "MUS2340", name: "World Music Cultures", credits: 3 },
        ],
    },
    {
        category: "Nuclear and Radiological Engineering",
        courses: [
            { code: "ENU4001", name: "Introduction to Nuclear Engineering", credits: 3 },
            { code: "ENU4605", name: "Radiation Interactions and Sources", credits: 3 },
            { code: "ENU4103", name: "Reactor Analysis and Design", credits: 3 },
        ],
    },
    {
        category: "Nursing",
        courses: [
            { code: "NUR3065", name: "Health Assessment", credits: 3 },
            { code: "NUR3128", name: "Pathophysiology for Nursing", credits: 3 },
            { code: "NUR3169", name: "Inquiry and Evidence in Professional Nursing Practice", credits: 3 },
        ],
    },
    {
        category: "Occupational Therapy",
        courses: [
            { code: "OTH3416", name: "Applied Kinesiology", credits: 3 },
            { code: "OTH4418", name: "Therapeutic Activities", credits: 3 },
            { code: "OTH5002", name: "Foundations of Occupational Therapy", credits: 3 },
        ],
    },
    {
        category: "Packaging Science",
        courses: [
            { code: "PKG3001", name: "Principles of Packaging", credits: 3 },
            { code: "PKG3103", name: "Packaging Materials", credits: 3 },
            { code: "PKG4008", name: "Advanced Packaging Systems", credits: 3 },
        ],
    },
    {
        category: "Pest Management | Plant Protection",
        courses: [
            { code: "PLP3002C", name: "Fundamentals of Plant Pathology", credits: 3 },
            { code: "ENY3007C", name: "Principles of Pest Management", credits: 3 },
            { code: "AGR4512", name: "Integrated Pest Management", credits: 3 },
        ],
    },
    {
        category: "Pharmacy",
        courses: [
            { code: "PHA3032", name: "Introduction to Pharmacology", credits: 3 },
            { code: "PHA4510", name: "Pharmaceutical Calculations", credits: 3 },
            { code: "PHA4933", name: "Special Topics in Pharmacy", credits: 3 },
        ],
    },
    {
        category: "Philosophy",
        courses: [
            { code: "PHI2010", name: "Introduction to Philosophy", credits: 3 },
            { code: "PHI2630", name: "Ethics in the Modern World", credits: 3 },
            { code: "PHI3300", name: "Theory of Knowledge", credits: 3 },
        ],
    },
    {
        category: "Physics",
        courses: [
            { code: "PHY2048", name: "Physics with Calculus 1", credits: 4 },
            { code: "PHY2049", name: "Physics with Calculus 2", credits: 4 },
            { code: "PHY3101", name: "Introduction to Modern Physics", credits: 3 },
        ],
    },
    {
        category: "Plant Pathology",
        courses: [
            { code: "PLP2000", name: "Plants, Plagues, and People", credits: 3 },
            { code: "PLP3002C", name: "Fundamentals of Plant Pathology", credits: 3 },
            { code: "PLP4653C", name: "Plant Disease Diagnosis", credits: 3 },
        ],
    },
    {
        category: "Political Science",
        courses: [
            { code: "POS2041", name: "American Federal Government", credits: 3 },
            { code: "CPO2001", name: "Comparative Politics", credits: 3 },
            { code: "INR2001", name: "Introduction to International Relations", credits: 3 },
        ],
    },
    {
        category: "Portuguese",
        courses: [
            { code: "POR1130", name: "Beginning Portuguese 1", credits: 5 },
            { code: "POR1131", name: "Beginning Portuguese 2", credits: 5 },
            { code: "POR3010", name: "Introduction to Portuguese and Brazil", credits: 3 },
        ],
    },
    {
        category: "Psychology",
        courses: [
            { code: "PSY2012", name: "General Psychology", credits: 3 },
            { code: "DEP3053", name: "Developmental Psychology", credits: 3 },
            { code: "EAB3002", name: "Principles of Behavior Analysis", credits: 3 },
        ],
    },
    {
        category: "Public Health",
        courses: [
            { code: "PHC4101", name: "Introduction to Public Health", credits: 3 },
            { code: "PHC4024", name: "Applied Epidemiology", credits: 3 },
            { code: "PHC4320", name: "Environmental Health Concepts", credits: 3 },
        ],
    },
    {
        category: "Public Relations",
        courses: [
            { code: "PUR3000", name: "Principles of Public Relations", credits: 3 },
            { code: "PUR3500", name: "Public Relations Research", credits: 3 },
            { code: "PUR4100", name: "Public Relations Writing", credits: 3 },
        ],
    },
    {
        category: "Quest",
        courses: [
            { code: "IDS2935", name: "Quest 1: Special Topics", credits: 3 },
            { code: "IDS2936", name: "Quest 2: Special Topics", credits: 3 },
            { code: "IDS1359", name: "Creativity in Action", credits: 3 },
        ],
    },
    {
        category: "Rehabilitative Services",
        courses: [
            { code: "RCS3030", name: "Introduction to Rehabilitation", credits: 3 },
            { code: "RCS4061", name: "Psychosocial Aspects of Disability", credits: 3 },
            { code: "RCS4240", name: "Vocational Rehabilitation", credits: 3 },
        ],
    },
    {
        category: "Religion",
        courses: [
            { code: "REL2300", name: "Introduction to World Religions", credits: 3 },
            { code: "REL2121", name: "American Religious History", credits: 3 },
            { code: "REL3103", name: "Religion and Nature", credits: 3 },
        ],
    },
    {
        category: "Russian | Languages, Literatures, and Cultures",
        courses: [
            { code: "RUS1130", name: "Beginning Russian 1", credits: 5 },
            { code: "RUS1131", name: "Beginning Russian 2", credits: 5 },
            { code: "RUS2220", name: "Intermediate Russian 1", credits: 3 },
        ],
    },
    {
        category: "Sociology",
        courses: [
            { code: "SYG2000", name: "Principles of Sociology", credits: 3 },
            { code: "SYG2010", name: "Social Problems", credits: 3 },
            { code: "SYA4300", name: "Methods of Social Research", credits: 3 },
        ],
    },
    {
        category: "Soil, Water, and Ecosystem Sciences",
        courses: [
            { code: "SWS3022", name: "Introduction to Soils in the Environment", credits: 3 },
            { code: "SWS4116", name: "Environmental Nutrient Management", credits: 3 },
            { code: "SWS4231", name: "Soil and Water Conservation", credits: 3 },
        ],
    },
    {
        category: "Spanish",
        courses: [
            { code: "SPN1130", name: "Beginning Spanish 1", credits: 5 },
            { code: "SPN1131", name: "Beginning Spanish 2", credits: 5 },
            { code: "SPN2200", name: "Intermediate Spanish 1", credits: 3 },
        ],
    },
    {
        category: "Speech, Language, and Hearing Sciences",
        courses: [
            { code: "SPA2024", name: "Phonetic Theory and Transcription", credits: 3 },
            { code: "SPA3032", name: "Fundamentals of Hearing", credits: 3 },
            { code: "SPA3101", name: "Speech Anatomy and Physiology", credits: 3 },
        ],
    },
    {
        category: "Sport Management",
        courses: [
            { code: "SPM2000", name: "Introduction to Sport Management", credits: 3 },
            { code: "SPM3204", name: "Sport Facility and Event Management", credits: 3 },
            { code: "SPM4104", name: "Sport Marketing", credits: 3 },
        ],
    },
    {
        category: "Statistics",
        courses: [
            { code: "STA2023", name: "Introduction to Statistics 1", credits: 3 },
            { code: "STA3032", name: "Engineering Statistics", credits: 3 },
            { code: "STA4210", name: "Regression Analysis", credits: 3 },
        ],
    },
    {
        category: "Sustainability and the Built Environment",
        courses: [
            { code: "DCP3210", name: "Sustainable Solutions for the Built Environment", credits: 3 },
            { code: "DCP3220", name: "Social and Cultural Sustainability", credits: 3 },
            { code: "DCP4941", name: "Practical Work in Sustainability", credits: 3 },
        ],
    },
    {
        category: "Theatre + Dance",
        courses: [
            { code: "THE2000", name: "Introduction to Theatre", credits: 3 },
            { code: "DAN2100", name: "Introduction to Dance Studies", credits: 3 },
            { code: "TPA2200", name: "Stagecraft", credits: 3 },
        ],
    },
    {
        category: "Tourism, Hospitality, and Event Management",
        courses: [
            { code: "HFT1000", name: "Introduction to Hospitality and Tourism", credits: 3 },
            { code: "LEI2181", name: "Leisure in Contemporary Society", credits: 3 },
            { code: "HFT2750", name: "Event Management", credits: 3 },
        ],
    },
    {
        category: "Turkish",
        courses: [
            { code: "TUR1130", name: "Beginning Turkish 1", credits: 5 },
            { code: "TUR1131", name: "Beginning Turkish 2", credits: 5 },
            { code: "TUR2220", name: "Intermediate Turkish 1", credits: 3 },
        ],
    },
    {
        category: "Urban and Regional Planning",
        courses: [
            { code: "URP3001", name: "Introduction to Urban and Regional Planning", credits: 3 },
            { code: "URP4000", name: "Planning for Sustainable Communities", credits: 3 },
            { code: "URP4273", name: "Survey of Planning Information Systems", credits: 3 },
        ],
    },
    {
        category: "Veterinary Medical Sciences",
        courses: [
            { code: "VME3001", name: "Introduction to Veterinary Medicine", credits: 3 },
            { code: "VME4012", name: "One Health: Disease in Humans and Animals", credits: 3 },
            { code: "VME4906", name: "Special Problems in Veterinary Science", credits: 3 },
        ],
    },
    {
        category: "Vietnamese | Languages, Literatures, and Culture",
        courses: [
            { code: "VIE1130", name: "Beginning Vietnamese 1", credits: 5 },
            { code: "VIE1131", name: "Beginning Vietnamese 2", credits: 5 },
            { code: "VIE2200", name: "Intermediate Vietnamese 1", credits: 3 },
        ],
    },
    {
        category: "Wildlife Ecology and Conservation",
        courses: [
            { code: "WIS2040", name: "Wildlife Issues in a Changing World", credits: 3 },
            { code: "WIS2552", name: "Biodiversity Conservation: Global Perspectives", credits: 3 },
            { code: "WIS3401", name: "Wildlife Ecology and Management", credits: 3 },
        ],
    },
    {
        category: "Writing Program",
        courses: [
            { code: "ENC1101", name: "Expository and Argumentative Writing", credits: 3 },
            { code: "ENC2210", name: "Technical Writing", credits: 3 },
            { code: "ENC3254", name: "Professional Writing in the Discipline", credits: 3 },
        ],
    },
    {
        category: "Zoology",
        courses: [
            { code: "ZOO2010", name: "General Zoology", credits: 3 },
            { code: "ZOO3713C", name: "Functional Vertebrate Anatomy", credits: 4 },
            { code: "ZOO4403C", name: "Marine Biology", credits: 4 },
        ],
    },

];

function UFClasses() {
    const [search, setSearch] = useState("");
    const [userClasses, setUserClasses] = useState<string[]>([]);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserClasses = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/classes/${userId}`);
                setUserClasses(res.data.map((c: { course_code: string }) => c.course_code));
            } catch (err) {
                console.error("Failed to fetch user classes", err);
            }
        };

        if (userId) fetchUserClasses();
    }, [userId]);

    const handleAddClass = async (courseCode: string) => {
        try {
            await axios.post("http://localhost:5001/classes/add", {
                user_id: userId,
                course_code: courseCode,
            });
            setUserClasses((prev) => [...prev, courseCode]);
        } catch (err) {
            console.error("Failed to add class", err);
        }
    };

    const handleRemoveClass = async (courseCode: string) => {
        try {
            await axios.post("http://localhost:5001/classes/remove", {
                user_id: userId,
                course_code: courseCode,
            });
            setUserClasses((prev) => prev.filter((code) => code !== courseCode));
        } catch (err) {
            console.error("Failed to remove class", err);
        }
    };

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
                                        {userClasses.includes(course.code) ? (
                                            <button
                                                className={styles.removeButton}
                                                onClick={() => handleRemoveClass(course.code)}
                                            >
                                                Remove
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.addButton}
                                                onClick={() => handleAddClass(course.code)}
                                            >
                                                Add
                                            </button>
                                        )}
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
